import { useEffect, useState } from 'react'
import { Box, Heading, Input, HStack, Button, SimpleGrid, Spinner, Text } from '@chakra-ui/react'
import { fetchProjects } from '../api/github'
import ProjectCard from '../components/ProjectCard'

export default function Projects() {
  const [owner, setOwner] = useState('vercel')
  const [loading, setLoading] = useState(false)
  const [projects, setProjects] = useState([])
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchProjects(owner)
      setProjects(data)
    } catch (e) {
      setError('无法获取项目数据')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box maxW="1200px" mx="auto" px={6} py={10}>
      <Heading mb={4} bgGradient="linear(to-r, brand.500, brand.700)" bgClip="text">开源项目</Heading>
      <Text color="gray.600" mb={4}>探索并关注行业领先的开源项目，查看实时统计与动态。</Text>
      <HStack mb={4} spacing={4}>
        <Input value={owner} onChange={e => setOwner(e.target.value)} placeholder="输入 GitHub 用户或组织" />
        <Button onClick={load}>加载</Button>
      </HStack>
      {loading && <Spinner />}
      {error && <Text color="red.500">{error}</Text>}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mt={4}>
        {projects.map(p => (
          <ProjectCard key={p.id} project={p} owner={owner} />
        ))}
      </SimpleGrid>
    </Box>
  )
}