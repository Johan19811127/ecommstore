import React from 'react'
import Sidebar from './sidebar';


export default function Adminlayout({children}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-slate-2100">
      {children}
      </div>
     
    </div>
  )}