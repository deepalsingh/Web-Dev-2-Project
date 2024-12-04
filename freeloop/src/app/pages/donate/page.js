"use client"

import { useUserAuth } from "@/app/_utils/auth-context";
import Donation from "@/app/components/Donation";
import { useState, useEffect } from "react";

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

    // Handle Add Donation 
    async function handleSubmit(event) {
        event.preventDefault();

        const token = await getIdToken();    
        console.log("User token", token);    

        if (!token) {
            console.log("No token found. Please log in");
            return;
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
                return;
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
            } else {
                console.log("Failed: ", response);
            }
        } catch (error) {
            console.log("Error getting donations: ", error);
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
        if (user) {
            getAllDonations();
        }
    }, [user]);  // Added user dependency to re-fetch donations when user logs in

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6 pt-32"> {/* pt-32 to avoid overlap with fixed header */}
            <div className="flex flex-col w-full sm:w-96 lg:w-1/2 justify-center items-center bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-xl border-4 border-gradient-to-r from-teal-400 to-sky-500 p-8 space-y-6">
                <h1 className="text-3xl font-extrabold text-sky-600 text-center mb-4">
                    Donate Page <span className="text-teal-500">Manage Donation</span>
                </h1>

                {/* User logged in */}
                {user ? (
                    <div className="w-full space-y-6">
                        {/* My Donations Section */}
                        <div>
                            <h2 className="text-2xl font-bold text-sky-600">My Donations</h2>
                            <div className="space-y-4 mt-4">
                                {donationList.map((donation) => (
                                    <Donation key={donation.id} donObj={donation} />
                                ))}
                            </div>
                        </div>

                        {/* New Donation Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <h2 className="text-2xl font-bold text-sky-600">New Donation</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Title</label>
                                    <input
                                        onChange={handleDTitleChange}
                                        value={dTitle}
                                        type="text"
                                        className="mt-2 p-3 w-full border rounded-lg border-gray-300 shadow-md focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Category</label>
                                    <input
                                        onChange={handleDCategoryChange}
                                        value={dCategory}
                                        type="text"
                                        className="mt-2 p-3 w-full border rounded-lg border-gray-300 shadow-md focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Condition</label>
                                    <input
                                        onChange={handleDConditionChange}
                                        value={dCondition}
                                        type="text"
                                        className="mt-2 p-3 w-full border rounded-lg border-gray-300 shadow-md focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <input
                                        onChange={handleDDescriptionChange}
                                        value={dDescription}
                                        type="text"
                                        className="mt-2 p-3 w-full border rounded-lg border-gray-300 shadow-md focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>

                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="bg-gradient-to-r from-teal-500 to-sky-400 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:from-teal-600 hover:to-sky-500 transition duration-300 transform hover:scale-105"
                                    >
                                        Submit Donation
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                ) : (
                    <p className="text-center text-lg text-gray-600">Please log in to view this page</p>
                )}
            </div>
        </div>
    );
}
