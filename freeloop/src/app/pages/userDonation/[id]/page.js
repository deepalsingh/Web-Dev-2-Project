"use client"

import { useUserAuth } from "@/app/_utils/auth-context";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";




export default function ContributionPage() {

    const { user, getIdToken } = useUserAuth();
    const { id } = useParams();

    const [donObj, setDonObj] = useState(null);   
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    const handleGetDonation = async () => {
        if(!user) {
            setError("No user found. Please log in");
            setIsLoading(false);
            return;
        }

        try {               
            const token = await getIdToken();

            if(!token) {
                console.log("No token found. Please log in");
                setError("No token found. Please log in");
                setIsLoading(false);
                return;
            }
            
            let request = new Request(`/api/user-donations/${id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            const response = await fetch(request);

            if (!response.ok) {
                const errorResponse = await response.json();
                console.log("Error response: ", errorResponse);
                setError(errorResponse.message || "Failed to fetch donation");
                setIsLoading(false);
                return;
            }


            if (response.ok) {
                const data = await response.json();                    
                setDonObj(data);
            } else {
                setError("Failed to get donation");
            }    
            
            setIsLoading(false);

        } catch (error) {
            console.error("Error fetching donation:", error);
            setError("An error occurred while fetching the donation");
        }
    };

    useEffect(() => {
        if (user && id) {
            handleGetDonation();
        }
    }, [id, user]);   

    if (!user) {
        return(
            <div>
                "User not found"
            </div>
        )
    }

    if (isLoading) {
        return <div>Loading...</div>;
        //use backdrop instead
    }

    if (error) {
        return <div className="error">{error}</div>;
    }


    return (
        <main className="mt-32">
            <header>
                <h1>Contribution Page</h1>
            </header>
            <article>
                {donObj &&
                    <div key={donObj.id}>
                        <h2>{donObj.title}</h2>
                        <p>{donObj.category}</p>
                        <p>{donObj.condition}</p>
                        <p>{donObj.description}</p>
                        <p>{donObj.location}</p>
                        <p>{donObj.status}</p>
                        {/* <div>
                            {donObj.images.map((img) => {
                                return (
                                    <img key={img.id} src={img.url} alt={img.alt} />
                                )
                            })}
                        </div> */}
                        {error && <p>{error}</p>}
                    </div>
                }
            </article>            
        </main>
    )
}