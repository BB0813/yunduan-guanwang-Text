import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || ''
})

export async function fetchProjects(owner = 'vercel') {
  const res = await api.get(`/api/github/projects`, { params: { owner } })
  return res.data
}

export async function fetchContributors(owner, repo) {
  const res = await api.get(`/api/github/stats`, { params: { owner, repo } })
  return res.data
}

export async function fetchProjectDetails(owner, repo) {
  const res = await api.get(`/api/github/project/${repo}`, { params: { owner } })
  return res.data
}

export async function fetchCommitActivity(owner, repo) {
  const res = await api.get(`/api/github/activity`, { params: { owner, repo }, validateStatus: () => true })
  // 后端可能返回202表示统计尚在计算中
  return { status: res.status, data: res.data }
}
