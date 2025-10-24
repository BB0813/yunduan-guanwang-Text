import { Box, Heading, List, ListItem, Text, Link } from '@chakra-ui/react'

const posts = [
  { title: '发布新项目 A', summary: '介绍项目 A 的背景与实现。', link: '#' },
  { title: '技术栈选型', summary: '为何选择 React + Chakra UI。', link: '#' },
]

export default function Blog() {
  return (
    <Box maxW="1200px" mx="auto" px={6} py={10}>
      <Heading mb={4} bgGradient="linear(to-r, brand.500, brand.700)" bgClip="text">博客</Heading>
      <List spacing={3}>
        {posts.map(p => (
          <ListItem key={p.title}>
            <Link href={p.link}>{p.title}</Link>
            <Text color="gray.600">{p.summary}</Text>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}