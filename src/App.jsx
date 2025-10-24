import { Container } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Team from './pages/Team'
import Blog from './pages/Blog'
import Contact from './pages/Contact'

export default function App() {
  return (
    <Container maxW="6xl" p={0}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/team" element={<Team />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Container>
  )
}
