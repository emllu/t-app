import React, { useEffect, useState } from 'react'
import {Sidebar, SidebarItemGroup} from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
const DashSidebar = () => {
    const  location=useLocation()
    const [tab,setTab]=useState('')
    useEffect(()=>{
        const urlParams= new URLSearchParams(location.search)
        const tabParams=urlParams.get('tab')
        if(tabParams){
            setTab(tabParams)
        }

    },[location.search])
      return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <SidebarItemGroup>
                <Link to='/dashboard?tab=profile'>
                <Sidebar.Item  active ={tab==='profile'}label={'user' } labelColor='dark' as='div' >
Profile
                </Sidebar.Item></Link>
               
                <Sidebar.Item  className='cursor-pointer'>
Signout
                </Sidebar.Item>
            </SidebarItemGroup>
        </Sidebar.Items>
    </Sidebar>)
}

export default DashSidebar