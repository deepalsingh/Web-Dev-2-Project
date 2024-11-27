"use client"

import { useUserAuth } from './_utils/auth-context'; 
import { useEffect, useState } from "react";
import Header from './components/Header';


// import Link from "next/link";

export default function Home() {

  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

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
                        {/* <ul>
                            {
                                blogPostList.map((post) => {
                                    let postUrl = `/week-10/${post.id}`
                                    
                                    return(<li key={post}>
                                        <Link href={postUrl}>{post.title}</Link>
                                        </li>
                                    )
                                })
                            }
                        </ul> */}
                    </section>
                    <button 
                        type="button"
                        onClick={handleSignOut}
                        className="text-lg bg-blue-900 text-white rounded px-2 py-1 mt-4"
                    >Sign Out</button>
                </div>
            ) : (
                <div>
                    <button 
                        type="button"
                        onClick={handleSignIn}
                        className="text-lg bg-blue-900 text-white rounded px-2 py-1 mt-4"
                    >Sign In</button>
                </div>
            )}
        </main>
  );
}
