import { Outlet } from 'react-router-dom'
import Header from '../components/_shared/Header'
import ThemeProvider from '../context/ThemeContext'
import Footer from '../components/_shared/Footer'
import ToUpButton from '../components/_shared/ToUpButton'

export default function Layout() {
  return (
    <ThemeProvider>
        <Header />
        <main className='relative top-[60px] sm:top-[70px] md:top-[90px]'>
            <Outlet />
        </main>
        <ToUpButton />
        <Footer />
    </ThemeProvider>
  )
}
