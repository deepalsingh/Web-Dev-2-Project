"use client"


import { useUserAuth } from "@/app/_utils/auth-context";
import Donation from "@/app/components/Donation";
import { useState, useEffect } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddDonationForm from "@/app/components/AddDonationForm";
import CloseIcon from '@mui/icons-material/Close';
import UserDonationsTable from "@/app/components/UserDonationsTable";




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

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const clearAddFields = () => {
        setDTitle("");
        setDCategory("");
        setDCondition("");
        setDDescription("");
    };

    // handle Add Donation 
    async function handleSubmit(event) {
        event.preventDefault();

        const token = await getIdToken();    
        // console.log("User token", token);    

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
                // console.log("Donation List:", data);

                setDonationList(data);                
                
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
                // setDonationList([...donationList, donationObj]);  
                // setDonationList((prevList) => [...prevList, addedDonation]);

                clearAddFields();
                handleClose();
                console.log("Donation added successfully", response);
            } else {
                console.log("Failed: ", response);
            }
        } catch (error) {
            console.log("Error adding donation: ", error);
        }
        
    }

    const handleDelete = async(donId) => {
        const token = await getIdToken();

        if(!token) {
            console.log("No token found. Please log in");
            return;
        }

        deleteDonation(donId, token);
        getAllDonations();
    }


    // handle DELETE request - Delete Donation
    async function deleteDonation(donId, token) {

        const confirmDelete = window.confirm("Are you sure you want to delete this donation?"); 

        if(confirmDelete){
            try {
                let request = new Request(`http://localhost:3000/api/donations/${donId}`,
                    {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}` 
                    }}
                );
    
                const response = await fetch(request);
    
                if (response.ok) {
                    console.log("Donation deleted successfully", response);            
                } 
                // else {
                //     console.log("Deletion Failed? ", response);
                // }            
            } catch (error) {
                console.log("Error deleting donation: ", error);
            }
        }        
        
    }


    useEffect(() => {
        if(user) {
            getAllDonations();
        }
    }, [user]);    


    return(
        <div className="mt-32">
            {user ? (
                <div>
                    <button onClick={handleOpen} className="text-emerald-950" >Add Donation</button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style.box}>
                            <div className="flex flex-row justify-between">
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Add New Donation
                                </Typography>
                                <CloseIcon onClick={handleClose}/>
                            </div>                        
                            <div className="mb-5">
                                <AddDonationForm                                 
                                    addDonation={handleSubmit} 
                                    handleDTitleChange={handleDTitleChange} 
                                    handleDCategoryChange={handleDCategoryChange}
                                    handleDConditionChange={handleDConditionChange} 
                                    handleDDescriptionChange={handleDDescriptionChange}
                                    dTitle={dTitle}
                                    dCategory={dCategory}
                                    dCondition={dCondition}
                                    dDescription={dDescription}
                                    />
                            </div>                            
                        </Box>                        
                    </Modal>   
                    <UserDonationsTable donations={donationList} deleteDonation={handleDelete} />               
                </div>
            ) : (
                <p>Please log in to view this page</p>
            )}

        </div>
    );
}

const style = {
    box : {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#c5c5c5',
        border: '2px solid #000',
        boxShadow: 24,
        borderRadius: 3,
        p: 4,
    }
  };