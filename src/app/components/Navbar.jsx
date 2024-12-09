import React, { useState } from 'react'
// import { RxHamburgerMenu } from "react-icons/rx";
// import { AiOutlineClose } from "react-icons/ai";
import { useUserAuth } from '../_utils/auth-context';
import Link from 'next/link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/navigation';
import { debounce } from 'lodash';




const Navbar = () => {

    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
    const [isOpen, setIsOpen] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const router = useRouter();

    const debouncedHandleSignIn = debounce(handleSignIn, 300);

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };

    const handleClick = (e, target) => {
        e.preventDefault();
        setIsOpen(false);
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    async function handleSignIn() {
        try {
            await gitHubSignIn();
            handleMenuClose();
        } catch (error) {
            console.log(error);
        }
    }

    async function handleSignOut() {
        try {
            await firebaseSignOut();
            handleMenuClose();
            router.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    const handleRouter = (value) => {
        router.push(`/${value}`);
        handleMenuClose();
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
                        <Link href="/campaigns" className="nav-item">Campaigns</Link>
                        <Link href="/charities" className="nav-item">Charities</Link>
                        {/* <Link href="/myfreeloop" className="nav-item bg-slate-800 text-emerald-400 active:bg-slate-300 active:text-emerald-800 hover:bg-zinc-50 hover:text-emerald-950" >My FreeLoop</Link> */}
                        {/* <a onClick={handleSignOut} href="#" className="nav-item ">SignOut</a> */}
                    </div>
                ) : (
                    <div className={`flex items-center flex-col md:flex-row md:gap-1 ${isOpen ? 'block' : 'hidden md:block'}`}>
                        <Link href="/about" className="nav-item">About</Link>
                        <a href="#campaigns" className="nav-item" onClick={debouncedHandleSignIn}>Campaigns</a>
                        <a href="#charities" className="nav-item" onClick={debouncedHandleSignIn}>Charities</a>
                        <a href="#" onClick={debouncedHandleSignIn} className="nav-item">Donate</a>
                        <a href="#login" onClick={debouncedHandleSignIn} className="px-5 py-2 rounded-full text-sm font-semibold transition duration-300 mx-4 my-2 md:my-0 bg-slate-800 text-emerald-400 active:bg-slate-300 active:text-emerald-800 hover:bg-zinc-50 hover:text-emerald-950">Login / Sign-In</a>
                    </div>
                )}
            </nav>
            {user ? (
                <div className="flex flex-row-reverse mb-14 items-center ">
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        PaperProps={{
                            sx: {
                                backgroundColor: "#353f4f",
                                borderRadius: "8px",
                                // border: "2px solid #33d399",
                                border: "1.8px solid #353f4f",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            }
                        }}
                    >
                        <MenuItem sx={menuStyles.menuItem} onClick={() => handleRouter("myfreeloop")}>My FreeLoop</MenuItem>
                        <MenuItem sx={menuStyles.menuItem}>Profile</MenuItem>
                        <MenuItem sx={menuStyles.menuItem} onClick={handleSignOut}>Sign Out</MenuItem>
                    </Menu>
                    <button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleMenuClick}
                    >
                        <img src={user.photoURL} alt="" className="w-[2.4rem] h-[2.4rem] mt-14 ml-3 mr-2 transition duration-300 ease-out hover:scale-110 hover:border-emerald-400 active:border-orange-400 rounded-full border border-slate-500" />
                    </button>
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



const menuStyles = {
    menuItem: {
        ":hover": {
            // backgroundColor: "#feba74",
            backgroundColor: "#33d399",
            color: "#353f4f",
            cursor: "pointer",
            transition: "background-color 0.3s ease-out, color 0.3s ease-out",
        },
        color: "white"
    }
}