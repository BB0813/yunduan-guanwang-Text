import { Box, Heading, SimpleGrid, Avatar, Text, VStack, HStack, Link, Icon, Button } from '@chakra-ui/react'
import { FaGithub, FaTwitter, FaLinkedin, FaQq, FaWeixin, FaUserCircle } from 'react-icons/fa'
import { Link as RouterLink } from 'react-router-dom'
import { members, joinUs } from '../data/team'

const SocialIcons = ({ links }) => (
  <HStack spacing={4} mt={2}>
    {links.github && (
      <Link href={links.github} isExternal>
        <Icon as={FaGithub} boxSize={5} />
      </Link>
    )}
    {links.twitter && (
      <Link href={links.twitter} isExternal>
        <Icon as={FaTwitter} boxSize={5} />
      </Link>
    )}
    {links.linkedin && (
      <Link href={links.linkedin} isExternal>
        <Icon as={FaLinkedin} boxSize={5} />
      </Link>
    )}
    {links.qqGroup && (
      <Link href={links.qqGroup} isExternal>
        <Icon as={FaQq} boxSize={5} />
      </Link>
    )}
    {links.wechat && (
      <Link href={links.wechat} isExternal>
        <Icon as={FaWeixin} boxSize={5} />
      </Link>
    )}
  </HStack>
)

export default function Team() {
  return (
    <Box maxW="1200px" mx="auto" px={6} py={10}>
      <Heading size="lg" mb={6}>我们的团队</Heading>
      <Text color="gray.600" mb={8}>我们是一群热爱开源、持续学习与分享的开发者。欢迎你的加入！</Text>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {members.map((member) => (
          <Box key={member.name} borderWidth="1px" borderRadius="md" p={6}>
            <VStack spacing={3}>
              {member.avatar ? (
                <Avatar size="xl" src={member.avatar} name={member.name} />
              ) : (
                <Icon as={FaUserCircle} boxSize={20} color="gray.400" />
              )}
              <Heading size="md">{member.name}</Heading>
              <Text color="gray.500">{member.role}</Text>
              <Text textAlign="center" color="gray.600">{member.bio}</Text>
              <SocialIcons links={member.links} />
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
      <Box mt={10} textAlign="center">
        <Link as={RouterLink} to="/contact">
          <Button>{joinUs.label}</Button>
        </Link>
        <Text mt={2} color="gray.500">{joinUs.description}</Text>
      </Box>
    </Box>
  )
}