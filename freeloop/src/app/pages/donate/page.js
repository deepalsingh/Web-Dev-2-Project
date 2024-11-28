"use client"


import { useUserAuth } from "@/app/_utils/auth-context";
import Donation from "@/app/components/Donation";
import { useState, useEffect } from "react";


// TODO: import Donation component


export default function DonatePage() {

    const { user, getIdToken } = useUserAuth();

    const [donationList, setDonationList] = useState([]);
    const [dTitle, setDTitle] = useState("");
    const [dCategory, setDCategory] = useState("");
    const [dCondition, setDCondition] = useState("");
    const [dDescription, setDDescription] = useState("");

    const handleDTitleChange = (event) => setDTitle(event.target.value);
    const handleDCategoryChange = (event) => setDCategory(event.target.value);
    const handleDConditionChange = (event) => setDCondition(event.target.value);
    const handleDDescriptionChange = (event) => setDDescription(event.target.value);



    // handle Add Donation 
    async function handleSubmit(event) {
        event.preventDefault();

        const token = await getIdToken();    
        console.log("User token", token);    

        if (!token) {
            console.log("No token found. Please log in");
            return
        }
        
        let donationObj = {
            title: dTitle,
            category: dCategory,
            condition: dCondition,
            description: dDescription
        }

        addDonation(donationObj, token);
        getAllDonations();
    }
   

    // Handle GET request - Get all Donations
    async function getAllDonations() { 
        try {
            const token = await getIdToken();

            if (!token) {
                console.log("No token found. Please log in");
                return
            }

            let request = new Request("http://localhost:3000/api/donations",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            const response = await fetch(request);

            if (response.ok) {
                const data = await response.json();
                console.log("Donation List:", data);

                setDonationList(data);

                console.log(donationList);  
                
            } else {
                console.log("Failed: ", response);
            }
        } catch (error) {
            console.log("Error getting donations: ", error)
        }
    }


    // Handle POST request - Add Donation
    async function addDonation(donationObj, token) {
        try {
            
            let request = new Request("http://localhost:3000/api/donations",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(donationObj)
                }
            );

            const response = await fetch(request);

            if (response.ok) {
                console.log("Donation added successfully", response);
            } else {
                console.log("Failed: ", response);
            }
        } catch (error) {
            console.log("Error adding donation: ", error);
        }
    }

    useEffect(() => {
        if(user) {
            getAllDonations();
        }
    }, []);    


    return(
        <div>
            <h1>Donate Page (Manage donation page)</h1>
            {user ? (
                <div>
                    <div>
                        <h2>My Donations</h2>
                        {donationList.map((donation) => (
                            <Donation key={donation.id} donObj={donation} />
                        ))} 
                    </div>
                    <form onSubmit={handleSubmit}>
                        <h2>New Donation</h2>
                        <div>
                            <label>Title</label>
                            <input onChange={handleDTitleChange} value={dTitle} type="text"></input>
                        </div>
                        <div>
                            <label>Category</label>
                            <input onChange={handleDCategoryChange} value={dCategory} type="text"></input>
                        </div>
                        <div>
                            <label>Condition</label>
                            <input onChange={handleDConditionChange} value={dCondition} type="text"></input>
                        </div>
                        <div>
                            <label>Description</label>
                            <input onChange={handleDDescriptionChange} value={dDescription} type="text"></input>
                        </div>
                        <div>
                            <button type="submit">Submit Donation</button>
                        </div>
                    </form>
                </div>
            ) : (
                <p>Please log in to view this page</p>
            )}

        </div>
    );
}