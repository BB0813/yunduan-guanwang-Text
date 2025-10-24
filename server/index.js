import express from 'express'
import axios from 'axios'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())

function ghClient() {
  const token = process.env.GITHUB_TOKEN
  const headers = token ? { Authorization: `token ${token}` } : {}
  return axios.create({
    baseURL: 'https://api.github.com',
    headers
  })
}

// 简单内存缓存（TTL）
const cache = new Map()
function cacheSet(key, data, ttlMs = 10 * 60 * 1000) {
  cache.set(key, { data, expires: Date.now() + ttlMs })
}
function cacheGet(key) {
  const v = cache.get(key)
  if (!v) return null
  if (Date.now() > v.expires) {
    cache.delete(key)
    return null
  }
  return v.data
}

app.get('/api/github/projects', async (req, res) => {
  const owner = req.query.owner
  if (!owner) return res.status(400).json({ error: 'owner is required' })
  try {
    const gh = ghClient()
    const { data } = await gh.get(`/users/${owner}/repos`, {
      params: { per_page: 50, sort: 'updated' }
    })
    res.json(data)
  } catch (err) {
    try {
      const gh = ghClient()
      const { data } = await gh.get(`/orgs/${owner}/repos`, {
        params: { per_page: 50, sort: 'updated' }
      })
      res.json(data)
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch GitHub projects' })
    }
  }
})

app.get('/api/github/stats', async (req, res) => {
  const { owner, repo } = req.query
  if (!owner || !repo) return res.status(400).json({ error: 'owner and repo are required' })
  try {
    const gh = ghClient()
    const { data } = await gh.get(`/repos/${owner}/${repo}/contributors`, {
      params: { per_page: 100 }
    })
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch contributors' })
  }
})

app.get('/api/github/project/:name', async (req, res) => {
  const name = req.params.name
  const owner = req.query.owner
  if (!owner) return res.status(400).json({ error: 'owner is required' })
  try {
    const gh = ghClient()
    const [issuesRes, prsRes] = await Promise.all([
      gh.get(`/repos/${owner}/${name}/issues`, { params: { state: 'open', per_page: 20 } }),
      gh.get(`/repos/${owner}/${name}/pulls`, { params: { state: 'open', per_page: 20 } })
    ])
    res.json({ issues: issuesRes.data, prs: prsRes.data })
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch project details' })
  }
})

// 新增：提交活跃度（近52周）
app.get('/api/github/activity', async (req, res) => {
  const { owner, repo } = req.query
  if (!owner || !repo) return res.status(400).json({ error: 'owner and repo are required' })
  const key = `activity:${owner}/${repo}`
  const cached = cacheGet(key)
  if (cached) return res.json(cached)

  try {
    const gh = ghClient()
    const response = await gh.get(`/repos/${owner}/${repo}/stats/commit_activity`)
    const data = response.data
    if (!Array.isArray(data)) {
      // GitHub可能返回202，表示统计尚在计算中
      return res.status(202).json({ processing: true })
    }
    cacheSet(key, data, 10 * 60 * 1000)
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch commit activity' })
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})