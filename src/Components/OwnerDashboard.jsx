import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const OwnerDashboard = () => {
    return (
        <>
            <div>
                <div className='bg-yellow-200 py-2'>
                    <Link to={'/dashboard'} className='font-semibold px-3'>My Houses</Link>
                    <Link to={'/dashboard/bookedHouse'} className='font-semibold px-3'>Booked House</Link>
                    <Link to={'/dashboard/add'} className='font-semibold px-3'>Add New</Link>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default OwnerDashboard