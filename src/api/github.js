import axios from 'axios'

export async function fetchProjects(owner = 'vercel') {
  const res = await axios.get(`/api/github/projects`, { params: { owner } })
  return res.data
}

export async function fetchContributors(owner, repo) {
  const res = await axios.get(`/api/github/stats`, { params: { owner, repo } })
  return res.data
}

export async function fetchProjectDetails(owner, repo) {
  const res = await axios.get(`/api/github/project/${repo}`, { params: { owner } })
  return res.data
}

export async function fetchCommitActivity(owner, repo) {
  const res = await axios.get(`/api/github/activity`, { params: { owner, repo }, validateStatus: () => true })
  // 后端可能返回202表示统计尚在计算中
  return { status: res.status, data: res.data }
}
