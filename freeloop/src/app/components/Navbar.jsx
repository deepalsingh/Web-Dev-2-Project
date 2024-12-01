import React, { useState } from 'react'
// import { RxHamburgerMenu } from "react-icons/rx";
// import { AiOutlineClose } from "react-icons/ai";
import { useUserAuth } from '../_utils/auth-context';
import Link from 'next/link';


const Navbar = () => {

    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
    const [isOpen, setIsOpen] = useState(false);


    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };

    const handleClick = (e, target) => {
        e.preventDefault();
        setIsOpen(false);
    };

    async function handleSignIn() {
        try {
            await gitHubSignIn();
        } catch (error) {
            console.log(error);
        }
    }

    async function handleSignOut() {
        try {
            await firebaseSignOut();
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="flex items-center fixed z-50">
            <nav className="flex flex-col md:flex-row items-center gap-1 py-2.5 px-1.5 border-white/10 rounded-full bg-white/10 backdrop-blur md:items-center md:justify-between">
                <div onClick={toggleMenu} className="flex items-center text-white md:hidden px-2.5 py-0.5">
                    {/* <button>
                        {isOpen ? <AiOutlineClose /> : <RxHamburgerMenu className="" />}
                    </button> */}
                </div>

                {user ? (
                    <div className={`flex flex-col md:flex-row md:gap-1 ${isOpen ? 'block' : 'hidden md:block'}`}>
                        <Link className="nav-item" href="./donate">Donate</Link>
                        <a href="#charities" className="nav-item" onClick={(e) => handleClick(e, '#charities')}>Charities</a>
                        <Link className="nav-item" href="./about">About</Link>
                        <a onClick={handleSignOut} href="#login" className="nav-item bg-slate-800 bg-slate-800 text-emerald-400 active:bg-slate-300 active:text-emerald-800 hover:bg-zinc-50 hover:text-emerald-950">SignOut</a>
                    </div>
                ) : (
                    <div className={`flex flex-col md:flex-row md:gap-1 ${isOpen ? 'block' : 'hidden md:block'}`}>
                        {/* <a href="#home" className="nav-item" onClick={(e) => handleClick(e, '#home')}>Home</a> */}
                        <a onClick={handleSignIn} href="#donate" className="nav-item">Donate</a>
                        <a href="#charities" className="nav-item" onClick={handleSignIn}>Charities</a>
                        <Link className="nav-item" href="./about">About</Link>
                        <a onClick={handleSignIn} href="#login" className="nav-item bg-slate-800 text-emerald-400 active:bg-slate-300 active:text-emerald-800 hover:bg-zinc-50 hover:text-emerald-950">Login / Sign-In</a>
                    </div>
                )}
            </nav>
        </div>
    )
}

export default Navbar