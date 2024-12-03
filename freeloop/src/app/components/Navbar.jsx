import React, { useState } from 'react'
// import { RxHamburgerMenu } from "react-icons/rx";
// import { AiOutlineClose } from "react-icons/ai";
import { useUserAuth } from '../_utils/auth-context';
import Link from 'next/link';
import MyFreeloopMenu from './UserMenu';




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
        <div className=" flex flex-row items-center">
            <nav className="flex flex-col items-center md:flex-row gap-1 py-2.5 px-1.5 border border-slate-500 h-12 border-white/10 rounded-full bg-white/10 backdrop-blur md:items-center md:justify-between">
                <div onClick={toggleMenu} className="flex items-center text-white md:hidden px-2.5 py-0.5">
                    {/* <button>
                        {isOpen ? <AiOutlineClose /> : <RxHamburgerMenu className="" />}
                    </button> */}
                </div>

                {user ? (
                    <div className={`flex items-center flex-grow flex-col md:flex-row md:gap-1 ${isOpen ? 'block' : 'hidden md:block'}`}>
                        <Link href="/about" className="nav-item">About</Link>
                        <a href="#charities" className="nav-item" onClick={(e) => handleClick(e, '#charities')}>Charities</a>
                        <Link href="/mydonations" className="nav-item bg-slate-800 text-emerald-400 active:bg-slate-300 active:text-emerald-800 hover:bg-zinc-50 hover:text-emerald-950" >My FreeLoop</Link>
                        <a onClick={handleSignOut} href="#" className="nav-item ">SignOut</a>
                    </div>
                ) : (
                    <div className={`flex items-center flex-col md:flex-row md:gap-1 ${isOpen ? 'block' : 'hidden md:block'}`}>
                        <Link href="/about" className="nav-item">About</Link>
                        <a href="#charities" className="nav-item" onClick={handleSignIn}>Charities</a>
                        <a href="#" onClick={handleSignIn} className="nav-item">Donate</a>
                        <a href="#login" onClick={handleSignIn} className="nav-item bg-slate-800 text-emerald-400 active:bg-slate-300 active:text-emerald-800 hover:bg-zinc-50 hover:text-emerald-950">Login / Sign-In</a>
                    </div>
                )}
            </nav>
            {user ? (
                <div className="flex flex-row-reverse mb-14 items-center ">
                    <img src={user.photoURL} alt="" className="w-[2.4rem] h-[2.4rem] mt-14 ml-3 mr-2 rounded-full border border-slate-500" />
                    {/* <p className="text-sm">Welcome <span className="font-bold">{user.displayName}!</span></p> */}
                    {/* <UserHeader /> */}
                </div>
            ) : (
                <div></div>
            )}
        </div>
    )
}

export default Navbar