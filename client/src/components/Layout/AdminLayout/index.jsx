import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

import './style.css';
// eslint-disable-next-line react/prop-types
function AdminLayout({children}) {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }
    return ( <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar}/>
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
        {children}
  </div> );
}

export default AdminLayout;