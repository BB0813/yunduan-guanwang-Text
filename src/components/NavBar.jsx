import { Flex, HStack, Heading, Link as ChakraLink, Spacer, IconButton, useColorMode, Image } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";

function NavItem({ to, children }) {
  return (
    <ChakraLink as={RouterLink} to={to} fontWeight="medium">
      {children}
    </ChakraLink>
  );
}

// 移除对本地文件的导入，改为使用 public 路径
export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Flex as="nav" align="center" p={4}>
      <HStack spacing={3}>
        <Image src="/云锻logo.jpg" alt="CloudForge Logo" h={6} borderRadius="md" />
        <Heading size="md" color="brand.600">
          CloudForge
        </Heading>
      </HStack>
      <Spacer />
      <HStack spacing={6}>
        <ChakraLink as={RouterLink} to="/" fontWeight="medium">首页</ChakraLink>
        <ChakraLink as={RouterLink} to="/projects" fontWeight="medium">项目</ChakraLink>
        <ChakraLink as={RouterLink} to="/team" fontWeight="medium">团队</ChakraLink>
        <ChakraLink as={RouterLink} to="/contact" fontWeight="medium">联系</ChakraLink>
        <IconButton aria-label="切换明暗色" onClick={toggleColorMode} icon={isDark ? <FaSun /> : <FaMoon />} variant="ghost" />
      </HStack>
    </Flex>
  );
}