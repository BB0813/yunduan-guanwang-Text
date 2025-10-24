import { Box, Text, HStack, Link } from '@chakra-ui/react'

export default function Footer() {
  return (
    <Box as="footer" p={6} textAlign="center" color="gray.600">
      <HStack spacing={4} justify="center" mb={2}>
        <Link href="https://github.com/" isExternal>GitHub</Link>
        <Link href="https://twitter.com/" isExternal>Twitter</Link>
      </HStack>
      <Text fontSize="sm">© {new Date().getFullYear()} CloudForge 开源团队</Text>
    </Box>
  )
}
