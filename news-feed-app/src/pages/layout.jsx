import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/_shared/Header'
import ThemeProvider from '../context/ThemeContext'

export default function Layout() {
  const [theme, setTheme] = useState("light")

  return (
    <ThemeProvider>
        <Header />
        <main className='relative top-[60px] sm:top-[70px] md:top-[90px]'>
            <Outlet />
        </main>
    </ThemeProvider>
  )
}
