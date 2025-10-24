import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

const theme = extendTheme({
  config: { initialColorMode: 'light', useSystemColorMode: true },
  colors: {
    brand: {
      50: '#e6f6ff', 100: '#cceeff', 200: '#99ddff', 300: '#66ccff', 400: '#33bbff',
      500: '#00aaff', 600: '#0088cc', 700: '#006699', 800: '#004466', 900: '#002233'
    }
  },
  fonts: {
    heading: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
    body: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif'
  },
  fontSizes: {
    xs: '12px', sm: '14px', md: '16px', lg: '18px', xl: '20px', '2xl': '24px'
  },
  components: {
    Button: {
      defaultProps: { colorScheme: 'brand', size: 'md' }
    },
    Heading: {
      baseStyle: { fontWeight: 700 }
    },
    Link: {
      baseStyle: { color: 'brand.600', _hover: { color: 'brand.700', textDecoration: 'underline' } }
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
)