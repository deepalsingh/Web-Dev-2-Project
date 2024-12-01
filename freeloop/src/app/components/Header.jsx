import React from 'react'
import Navbar from './Navbar';
import { useUserAuth } from '../_utils/auth-context';


const Header = () => {

    const { user } = useUserAuth();

    return (
        <header className="fixed top-0 left-0 w-full h-24 bg-slate-800 text-white shadow-md z-50">
            <nav className="flex justify-between items-center h-24 max-w-screen-xl mx-auto px-4 py-3" id="home">
                <div className="flex items-center mr-[2rem]">
                    <a href="/">
                        <h1 className="text-4xl font-semibold text-emerald-600 hover:text-emerald-400">FreeLoop</h1>
                    </a>
                </div>
                <div className="flex items-center justify-end">
                    <Navbar />
                </div>
            </nav >
        </header>
    )
}

export default Header

