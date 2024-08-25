import React from 'react'
import { useSelector } from 'react-redux'
import Sidebar from './sidebar';





export default function Adminlayout({children}) {





export default function Home([children]) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-100">
      {children}
      </div>
      <p className="footertext">a Proud product of School Strore  &#169; 2024</p>
    </div>
  )}