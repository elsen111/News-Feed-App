import {Routes, Route } from 'react-router-dom'; 
import Layout from "../pages/layout";
import Home from "../pages/Home/page";
import Saved from "../pages/Saved/page";
import Category from "../pages/category/page";
import Suggestion from "../pages/suggestion/page";
import Error from '../pages/error/page'

export default function AppRouter() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/suggested" element={<Suggestion />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
  )
}
