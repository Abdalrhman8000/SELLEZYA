import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import theme from './global/them'
import "./global/main.css";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Context } from './context/Context'
import { Root } from './routes/Root'

const root = ReactDOM.createRoot(document.getElementById('root'))



root.render(
    <ChakraProvider>
     <ColorModeScript  initialColorMode={theme.config.initialColorMode}/>
      <BrowserRouter>
     <Context>
          <Root/>
     </Context>
        </BrowserRouter>
      <ToastContainer/>
    </ChakraProvider>

)