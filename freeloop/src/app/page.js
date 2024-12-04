"use client"

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

    return (
        <main className="flex flex-col min-h-screen pt-10 pb-28"> {/* Adjust top and bottom padding */}
            
            {/* Logged-in User Content */}
            {user ? (
                <div className="flex flex-col items-center">
                    <div className="flex flex-row-reverse mb-14 items-center">                        
                        <p className="text-sm mr-20">Welcome <span className="font-bold">{user.displayName}!</span></p>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center border-4 border-gradient-to-r from-teal-400 to-sky-500 mx-8 mt-14 h-auto rounded-xl p-8 shadow-xl bg-white bg-opacity-80 backdrop-blur-lg">
                     <h1 className="text-4xl font-extrabold text-sky-600 text-center mb-4">
                     Welcome to <span className="text-teal-500">Freeloop</span>
                     </h1>
                    <p className="text-lg text-gray-700 text-center mb-6">
                     Join Us And Make This World A Better Place To Live In <span className="text-2xl">{infinitySym}</span>
                    </p>
                <div className="flex flex-row items-center mt-5">
                  <Link href="/pages/mydonations" className="mr-3">
                  <button className="bg-teal-500 text-white py-2 px-4 rounded-lg">Contribute Today</button>
                  </Link>
                  <p className="mx-2">/</p>
                  <Link href="#" className="ml-3">
                  <button className="bg-teal-500 text-white py-2 px-4 rounded-lg">View All Listings!</button>
                  </Link>  
                </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center border-4 border-gradient-to-r from-teal-400 to-sky-500 mx-8 mt-14 h-72 rounded-xl p-8 shadow-xl bg-white bg-opacity-80 backdrop-blur-lg">
                    <h1 className="text-4xl font-extrabold text-sky-600 text-center mb-4">
                        Welcome to <span className="text-teal-500">Freeloop</span>
                    </h1>
                    <p className="text-lg text-gray-700 text-center mb-6">
                    Join Us And Make This World A Better Place To Live In <span className="text-2xl">{infinitySym}</span>
                    </p>
                    <button className="bg-gradient-to-r from-teal-500 to-sky-400 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:from-teal-600 hover:to-sky-500 transition duration-300 transform hover:scale-105">
                        Sign In to Contribute / View All Listings!
                    </button>
                </div>
            )}

            {/* "See Donations" Section */}
            {allDonations.length == 0 ? (
                <section className="mt-8 p-6 bg-white bg-opacity-90 rounded-2xl shadow-lg max-w-2xl mx-auto">
                    <h2 className="text-2xl font-extrabold text-sky-700 text-center mb-4">See Donations in Your Area</h2>
                    <p className="text-lg text-gray-600 text-center mb-4">
                        No Donations Found! <span role="img" aria-label="sad face">😢</span>
                    </p>
                    <div className="text-center">
                        <p className="text-lg text-gray-500">
                            It seems like there are no donations available at the moment. Try again later or post your own donation!
                        </p>
                    </div>
                </section>
            ) : (
                <ul>
                    {/* Your donations will be displayed here */}
                </ul>
            )}
            

            
            
        </main>
    );
}
