import React from 'react'
import ReactDOM from 'react-dom/client'
import App from'./App'

import { CssBaseline } from '@mui/material'
import { ThemeProvider } from 'styled-components'
import { createTheme } from "@mui/material";


const ThemeConfig = createTheme( {
    palette: {
      type: 'light',
      primary: {
        main: '#ffffff',
        light: '#4e0096',
        dark: '#000000',
      },
      secondary: {
        main: '#7800ff',
        dark: '#5f00c1',
      },
      error: {
        main: '#ff4436',
      },
      background: {
        default: '#ffffff',
        paper: '#f9f9f9',
      },
      success: {
        main: '#4fbf54',
      },
      
    },
  })


ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={ThemeConfig}>
        <CssBaseline/>
        <App />
    </ThemeProvider>
)
