import React from 'react'
import Navbar from './Navbar';


const Header = () => {
    return (
        <div className="">
            <nav className="flex items-center justify-between py-6 mb-20" id="home">
                <div className="flex items-center">
                    <a href="/">
                        <h1 className="text-4xl font-semibold text-emerald-900 hover:text-emerald-400">FreeLoop</h1>
                    </a>
                </div>
                <div className="flex-grow flex items-center justify-end">
                    <Navbar />
                </div>
            </nav >
        </div>
    )
}

export default Header