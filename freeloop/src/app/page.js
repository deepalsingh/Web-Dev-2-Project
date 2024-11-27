"use client"

import { useUserAuth } from './_utils/auth-context'; 
import { useEffect, useState } from "react";
import Header from './components/Header';
import { dbGetAllDonations } from './_services/donation_service';


// import Link from "next/link";

export default function Home() {

    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();  
    const [donations, setDonations] = useState([]);
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
        if(user) {
            dbGetAllDonations(user.uid, (donationList) => {
                setDonations(donationList);
                setLoading(false);
            });
        }           
    }, [user]); 

    if (user) console.log(user.uid);

    return (
        <main className="m-5">
            <Header />

            {user ? (
                <div>
                    <p>Welcome {user.displayName}!</p>
                    <p>{user.email}</p>
                    <img src={user.photoURL} alt="" className="w-10 h-10" />
                    <div>
                        {/* <Link href="/week-10/add-blog-post">Post a new Donation</Link> */}
                    </div>
                    <section className="mt-6">
                        <h2 className="text-sky-400">My Donations</h2>
                        {/* {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <ul>
                                {donations.map((donation) => {
                                    return (
                                        <li key={donation.id}>
                                            <p>{donation.title}</p>                    
                                        </li>
                                    )
                                })}
                            </ul>
                        )} */}
                    </section>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center border border-stone-500 mx-12 mt-4 h-60 rounded-xl">
                    <h1 className="text-3xl">Welcome to Freeloop</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. <span className="text-2xl">{infinitySym}</span></p>
                    <button onClick={handleSignIn} className="mt-5">Sign In to Donate or View All Listings</button>
                </div>
            )}
            {donations.length == 0 ? (
                <p>No Donations Found!</p>
            ) : (
                <ul>
                    {donations.map((donation) => {
                        return (
                            <li key={donation.id}>
                                <p>{donation.title}</p>                    
                            </li>
                        )
                    })}
                </ul>
            )}

        </main>
    );
  }