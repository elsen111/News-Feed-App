import { createContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/_shared/Header'

export const ThemeContext = createContext()

export default function Layout() {
  const [theme, setTheme] = useState("light")

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
        <Header />
        <main className='relative top-[60px] sm:top-[70px] md:top-[90px]'>
            <Outlet />
        </main>
    </ThemeContext.Provider>
  )
}
