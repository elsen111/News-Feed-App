import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/_shared/Header'

export default function Layout() {
  return (
    <>
        <Header />
        <main>
            <Outlet />
        </main>
    </>
  )
}
