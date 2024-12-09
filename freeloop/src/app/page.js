"use client"

import { useUserAuth } from './_utils/auth-context'; 
import { useEffect, useState } from "react";
import Link from 'next/link';
import DonationsList from './components/DonationsGlobal';


// import Link from "next/link";

export default function Home() {

    const { user, gitHubSignIn } = useUserAuth();  
    const [allDonations, setAllDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const infinitySym = '\u{221E}';

    async function handleSignIn() {
        try {
            await gitHubSignIn();
        } catch (error) {
            console.log(error);
        }
    }

    // useEffect(() => {
    //     if(user) {
    //         dbGetAllDonations(user.uid, (donationList) => {
    //             setDonations(donationList);
    //             setLoading(false);
    //         });
    //     }           
    // }, [user]); 

    // if (user) console.log(user.uid);

    return (
        <main className="mx-5">           
            {user ? (
                <div className="">
                    <div className="flex flex-row-reverse mb-14 items-center">                        
                        <p className="text-sm mr-20">Welcome <span className="font-bold">{user.displayName}!</span></p>
                        {/* <UserHeader /> */}
                    </div>
                    
                    <div className="flex flex-col items-center justify-center border border-slate-500 bg-emerald-400 mx-12 mt-28 h-44 rounded-xl">
                        <h1 className="text-3xl">Welcome to Freeloop</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. <span className="text-2xl">{infinitySym}</span></p>

                        <div className='flex flex-row items-center space-x-4 mt-3'>
                            <Link 
                                href="/pages/myfreeloop" 
                                className="bg-slate-700 text-white p-4 rounded-3xl transition duration-300 ease-out hover:scale-105 hover:text-emerald-400 active:text-orange-400"
                                >
                                    Contribute Today
                                </Link>                         
                            <button className="bg-slate-700 text-white p-4 rounded-3xl transition duration-300 ease-out hover:scale-105 hover:text-orange-400 active:text-emerald-400">View All Listings!</button>
                        </div>       
                    </div>
                    <DonationsList />
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center border border-slate-500 bg-emerald-400 mx-12 mt-28 h-44 rounded-xl">
                    <h1 className="text-3xl">Welcome to Freeloop</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. <span className="text-2xl">{infinitySym}</span></p>
                    <div className='flex flex-row items-center space-x-4 mt-3'>
                        <button className="bg-slate-700 text-white p-4 rounded-3xl transition duration-300 ease-out hover:scale-105 hover:text-emerald-400 active:text-orange-400" onClick={handleSignIn}>Sign In to Contribute</button>                         
                        <button className="bg-slate-700 text-white p-4 rounded-3xl transition duration-300 ease-out hover:scale-105 hover:text-orange-400 active:text-emerald-400" onClick={handleSignIn}>View All Listings!</button>
                    </div>                    
                </div>
                
            )}            
        </main>
    );
  }