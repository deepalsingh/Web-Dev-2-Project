"use client"

import { useUserAuth } from './_utils/auth-context'; 
import { useEffect, useState } from "react";
import Header from './components/Header';


// import Link from "next/link";

export default function Home() {

  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();



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
                </div>
            ) : (
                <div>
                    <p>Donations</p>
                </div>
            )}
        </main>
  );
}
