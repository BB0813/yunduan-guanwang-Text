import { Box, Heading, Text, SimpleGrid, HStack, VStack, Link, Button, Icon } from '@chakra-ui/react'
import { FaEnvelope, FaGithub, FaDiscord, FaTelegramPlane, FaQq } from 'react-icons/fa'
import { contacts } from '../data/contacts'

const iconMap = {
  email: FaEnvelope,
  github: FaGithub,
  discord: FaDiscord,
  telegram: FaTelegramPlane,
  qq: FaQq
}

export default function Contact() {
  return (
    <Box maxW="1200px" mx="auto" px={6} py={10}>
      <Heading size="lg" mb={2}>联系我们</Heading>
      <Text color="gray.600" mb={8}>加入我们的开源社区</Text>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {contacts.map(item => {
          const IconComp = iconMap[item.key]
          const isExternal = item.href.startsWith('http')
          return (
            <Box key={item.key} borderWidth="1px" borderRadius="md" p={6}>
              <HStack spacing={4} align="flex-start">
                <Icon as={IconComp} boxSize={6} color="brand.500" />
                <VStack align="start" spacing={2}>
                  <Heading size="sm">{item.label}</Heading>
                  <Text color="gray.600">{item.description}</Text>
                  <Link href={item.href} isExternal={isExternal}>
                    <Button>{item.cta}</Button>
                  </Link>
                </VStack>
              </HStack>
            </Box>
          )
        })}
      </SimpleGrid>
    </Box>
  )
}