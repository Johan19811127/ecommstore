import React from 'react'
import Sidebar from './sidebar';


export default function Adminlayout({children}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray00">
      {children}
      </div>
     
    </div>
  )}