import { Box, Heading, Text, Stack, Button, SimpleGrid, useColorModeValue, Image } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
// 移除对 '../../云锻logo.jpg' 的导入，统一使用 public 路径

export default function Home() {
  const heroBg = useColorModeValue(
    "linear-gradient(135deg, rgba(0,170,255,0.08), rgba(0,136,204,0.08))",
    "linear-gradient(135deg, rgba(0,170,255,0.12), rgba(0,136,204,0.12))"
  );

  return (
    <Box maxW="1200px" mx="auto" px={6} py={10}>
      <Box borderWidth="1px" borderRadius="lg" p={10} bgGradient={heroBg}>
        <Stack spacing={6} align="center" textAlign="center">
          <Image src="/云锻logo.jpg" alt="CloudForge Logo" h={16} borderRadius="md" />
          <Heading
            size="xl"
            bgGradient="linear(to-r, brand.500, brand.700)"
            bgClip="text"
          >
            云锻开源团队 CloudForgeTech
          </Heading>
          <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.300")}
          >
            打造更快、更稳、更现代的开源数据与云原生工具。
          </Text>
          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <Button as={RouterLink} to="/projects" colorScheme="brand">
              了解团队成员
            </Button>
            <Button as={RouterLink} to="/projects" variant="outline">
              探索开源项目
            </Button>
          </Stack>
        </Stack>
      </Box>

      <Box mt={10}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <Box borderWidth="1px" borderRadius="lg" p={6}>
            <Heading size="md">开源协作</Heading>
            <Text mt={2} color={useColorModeValue("gray.600", "gray.300")}>
              与全球开发者共建，持续输出高质量的云原生组件与工具。
            </Text>
          </Box>
          <Box borderWidth="1px" borderRadius="lg" p={6}>
            <Heading size="md">工程效率</Heading>
            <Text mt={2} color={useColorModeValue("gray.600", "gray.300")}>
              以自动化、标准化与可观测为核心，提升交付速度与质量。
            </Text>
          </Box>
          <Box borderWidth="1px" borderRadius="lg" p={6}>
            <Heading size="md">技术前沿</Heading>
            <Text mt={2} color={useColorModeValue("gray.600", "gray.300")}>
              关注云计算、数据工程与 AI 的交叉创新实践。
            </Text>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
}