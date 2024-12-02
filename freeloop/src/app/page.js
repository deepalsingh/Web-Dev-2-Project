"use client"

import { useUserAuth } from './_utils/auth-context'; 
import { useEffect, useState } from "react";
import UserHeader from './components/UserHeader';

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

    if (user) console.log(user.uid);

    return (
        <main className="mx-5">           
            {user ? (
                <div className="">
                    <div className="flex flex-row-reverse mb-14 items-center">                        
                        <p className="text-sm mr-20">Welcome <span className="font-bold">{user.displayName}!</span></p>
                        {/* <UserHeader /> */}
                    </div>
                    
                    <div className="flex flex-col items-center justify-center border border-slate-500 mx-12 mt-28 h-60 rounded-xl">
                        <h1 className="text-3xl">Welcome to Freeloop</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. <span className="text-2xl">{infinitySym}</span></p>
                        <button onClick={handleSignIn} className="mt-5">Contribute Today / View All Listings!</button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center border border-slate-500 mx-12 mt-36 h-60 rounded-xl">
                    <h1 className="text-3xl">Welcome to Freeloop</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. <span className="text-2xl">{infinitySym}</span></p>
                    <button onClick={handleSignIn} className="mt-5">Sign In to Contribute / View All Listings!</button>
                </div>
                
            )}
            {allDonations.length == 0 ? (

                <section className="mt-6">
                    <h2 className="text-sky-800">See Donations in your Area</h2>
                    {/* {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <ul>
                            {allDonations.map((donation) => {
                                return (
                                    <li key={allDonations.id}>
                                        <p>{allDonations.title}</p>                    
                                    </li>
                                )
                            })}
                        </ul>
                    )} */}
                        <p>No Donations Found!</p>
                    </section>
                
            ) : (
                <ul>
                    
                </ul>
            )}

        </main>
    );
  }