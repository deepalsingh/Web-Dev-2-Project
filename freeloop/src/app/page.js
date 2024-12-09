"use client";

import { useUserAuth } from './_utils/auth-context'; 
import { useEffect, useState } from "react";
import Link from 'next/link';
import DonationsList from './components/DonationsGlobal';

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

    useEffect(() => {
        if (user) {
            // Simulating fetching donations
            setTimeout(() => {
                setAllDonations([]); // simulate no donations found
                setLoading(false);
            }, 2000);
        } else {
            setLoading(false); // If no user, stop loading
        }
    }, [user]);

    return (
        <main className="min-h-screen flex flex-col items-center justify-center mx-5">
            {/* User is Signed In */}
            {user ? (
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="flex flex-row-reverse mb-6 items-center">
                        <p className="text-xs text-sky-600 font-semibold mr-20">Welcome <span className="font-bold">{user.displayName}!</span></p>
                    </div>
                    
<<<<<<< HEAD
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
=======
                    {/* Welcome Card (Logged In) */}
                    <div className="flex flex-col items-center justify-center border border-slate-500 bg-white rounded-xl shadow-lg w-full max-w-md p-6">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-slate-500 to-emerald-700 bg-clip-text text-transparent mb-4">
                            Welcome to FreeLoop
                        </h1>
                        <p className="text-lg mb-4">Your space to contribute and help others in need. <span className="text-3xl">{infinitySym}</span></p>
                        <div className="flex flex-row items-center justify-center gap-3">
                            <Link href="/pages/mydonations" className="bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition duration-300">
                                Contribute Today
                            </Link>
                            <p>/</p>
                            <Link href="#" className="bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition duration-300">
                                View All Listings!
                            </Link>
                        </div>
>>>>>>> 2867a972823dce502269e205f75da88705d97258
                    </div>
                    <DonationsList />
                </div>
            ) : (
<<<<<<< HEAD
                <div className="flex flex-col items-center justify-center border border-slate-500 bg-emerald-400 mx-12 mt-28 h-44 rounded-xl">
                    <h1 className="text-3xl">Welcome to Freeloop</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. <span className="text-2xl">{infinitySym}</span></p>
                    <div className='flex flex-row items-center space-x-4 mt-3'>
                        <button className="bg-slate-700 text-white p-4 rounded-3xl transition duration-300 ease-out hover:scale-105 hover:text-emerald-400 active:text-orange-400" onClick={handleSignIn}>Sign In to Contribute</button>                         
                        <button className="bg-slate-700 text-white p-4 rounded-3xl transition duration-300 ease-out hover:scale-105 hover:text-orange-400 active:text-emerald-400" onClick={handleSignIn}>View All Listings!</button>
                    </div>                    
                </div>
                
            )}            
=======
                /* User is NOT Signed In */
                <div className="flex flex-col items-center justify-center border border-slate-500 bg-white rounded-xl shadow-lg w-full max-w-md p-6">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-slate-500 to-emerald-700 bg-clip-text text-transparent mb-4">Welcome to FreeLoop</h1>
                    <p className="text-lg mb-4">Your space to contribute and help others in need. <span className="text-3xl">{infinitySym}</span></p>
                    <button 
                        onClick={handleSignIn}
                        className="bg-sky-600 text-white px-6 py-2 rounded-md hover:bg-sky-700 transition duration-300">
                        Sign In to Contribute / View Listings
                    </button>
                </div>
            )}

            {/* Donations Section */}
            <section className="mt-6 text-center">
                <h2 className="text-sky-800 text-2xl font-semibold mb-4">See Donations in Your Area</h2>
                {loading ? (
                    <p className="text-lg text-gray-600">Loading donations...</p>
                ) : allDonations.length === 0 ? (
                    <p className="text-lg text-gray-600">No Donations Found!</p>
                ) : (
                    <ul>
                        {/* Add donation list here */}
                        {allDonations.map((donation) => (
                            <li key={donation.id} className="bg-gray-100 rounded-md p-4 mb-4 shadow-md">
                                <h3 className="font-semibold">{donation.title}</h3>
                                <p>{donation.description}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
>>>>>>> 2867a972823dce502269e205f75da88705d97258
        </main>
    );
}
