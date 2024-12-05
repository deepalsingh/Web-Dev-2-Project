"use client";

import { useUserAuth } from './_utils/auth-context'; 
import { useEffect, useState } from "react";
import Link from 'next/link';

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
                    </div>
                </div>
            ) : (
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
        </main>
    );
}
