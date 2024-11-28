"use client"


import { useUserAuth } from "@/app/_utils/auth-context";
import { useState, useEffect } from "react";

// TODO: import Donation component


export default function DonatePage() {

    const { user, gitHubSignIn, firebaseSignOut, getIdToken } = useUserAuth();

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
        // getAllDonations();
    }

    // Handle POST request - Add Donation
    async function addDonation(donationObj, token) {
        try {
            console.log("Authorization Header:", `Bearer ${token}`); // Log the token

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

            // const response = await fetch("http://localhost:3001/api/donations", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //         "Authorization": `Bearer ${token}`, 
            //     },
            //     body: JSON.stringify(donationObj),
            // });

            if (response.ok) {
                console.log("Donation added successfully", response);
            } else {
                console.log("Failed: ", response);
            }

        } catch (error) {
            console.log("Error adding donation: ", error);
        }
    }


    return(
        <div>
            <h1>Donate Page (Manage donation page)</h1>
            {user ? (
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
            ) : (
                <p>Please log in to view this page</p>
            )}

        </div>
    );
}