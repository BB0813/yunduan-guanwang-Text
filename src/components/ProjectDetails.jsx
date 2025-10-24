import { useEffect, useState } from 'react'
import { Box, Heading, Spinner, Text, List, ListItem, Link, Button } from '@chakra-ui/react'
import { fetchProjectDetails } from '../api/github'

export default function ProjectDetails({ owner, repo }) {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [prs, setPrs] = useState([])
  const [issues, setIssues] = useState([])

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchProjectDetails(owner, repo)
      setPrs(data.prs || [])
      setIssues(data.issues || [])
    } catch (e) {
      setError('无法获取项目详情')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (visible && prs.length === 0 && issues.length === 0) {
      load()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  return (
    <Box mt={3}>
      <Button onClick={() => setVisible(v => !v)}>
        {visible ? '隐藏项目动态' : '显示项目动态（PR/Issue）'}
      </Button>
      {visible && (
        <Box mt={3}>
          {loading && <Spinner />}
          {error && <Text color="red.500">{error}</Text>}
          {!loading && (
            <Box>
              <Heading size="sm" mb={2}>开放的 Pull Requests</Heading>
              {prs.length === 0 && <Text color="gray.500">暂无开放 PR</Text>}
              <List spacing={2}>
                {prs.map(pr => (
                  <ListItem key={pr.id}>
                    <Link href={pr.html_url} isExternal>{pr.title}</Link>
                  </ListItem>
                ))}
              </List>

              <Heading size="sm" mt={4} mb={2}>开放的 Issues</Heading>
              {issues.length === 0 && <Text color="gray.500">暂无开放 Issue</Text>}
              <List spacing={2}>
                {issues.map(issue => (
                  <ListItem key={issue.id}>
                    <Link href={issue.html_url} isExternal>{issue.title}</Link>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}