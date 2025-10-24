import { Box, Heading, Text, Link, HStack, Badge, Icon, useColorModeValue } from '@chakra-ui/react'
import ContributorsChart from './ContributorsChart'
import ProjectDetails from './ProjectDetails'
import ActivityChart from './ActivityChart'
import { FaGithub } from 'react-icons/fa'

export default function ProjectCard({ project, owner }) {
  const cardBg = useColorModeValue('white', 'gray.700')
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} bg={cardBg} transition="all .2s"
         _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg', borderColor: 'brand.500' }}>
      <HStack justify="space-between" align="center">
        <Heading size="md">{project.name}</Heading>
        <HStack>
          <Badge colorScheme="yellow">⭐ {project.stargazers_count}</Badge>
          {project.language && <Badge colorScheme="brand">{project.language}</Badge>}
        </HStack>
      </HStack>
      <Text mt={2} color="gray.600">{project.description || '暂无描述'}</Text>
      <Link href={project.html_url} isExternal mt={3} display="inline-flex" alignItems="center">
        <Icon as={FaGithub} mr={2} />
        查看 GitHub
      </Link>
      <ProjectDetails owner={owner} repo={project.name} />
      <ContributorsChart owner={owner} repo={project.name} />
      <ActivityChart owner={owner} repo={project.name} />
    </Box>
  )
}