import React from 'react'
import { useSelector } from 'react-redux'
import Sidebar from './sidebar';





export default function Adminlayout({children}) {





export default function Home([children]) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-100">
      
      </div>
    </div>
  );
}

 
    <div className={styles.layout}>
      <Sidebar/>
       
       <div
       style={{ marginLeft: `${showSidebar ? "280px": "80px"}`}}
        className={styles.layout_main}
        >
           <div className="container w-100 p-4 mx-auto " style={{width:'100%'}}>
            {children}
            <div style={{ marginLeft: `${showSidebar ? "280px": "80px"}`}} className="fixed-bottom text-center">

  <div className="container">
   
    <p className="footertext">a Proud product of School Strore  &#169; 2024</p>
  </div>
  </div>
</div>
</div>
            </div>
       
       
       </div>
  )
}