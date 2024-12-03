"use client"


import { useUserAuth } from "@/app/_utils/auth-context";
import DonationForm from "@/app/components/DonationForm";
import { useState, useEffect } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddDonationForm from "@/app/components/DonationForm";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import UserDonationsTable from "@/app/components/UserDonationsTable";
import { getDateTimeNow } from "@/app/_utils/dateUtils";




// TODO: import Donation component
export default function DonatePage() {

    const { user, getIdToken } = useUserAuth();
    const [donationList, setDonationList] = useState([]);
    const [donObj, setDonObj] = useState({});

    const [task, setTask] = useState("");
    const [open, setOpen] = useState(false);
    
    const handleAddOpen = () => {
        setTask("Add");    
        setOpen(true);
    };    

    const handleClose = () => setOpen(false);

    // const handleUpdateOpen = () => {
    //     setTask("Update");    
    //     setOpen(true)
    // };


    useEffect(() => {
        if(user) {
            getAllDonations();
        }
    }, [user]);    


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

    const handleDelete = async(donId) => {
        const token = await getIdToken();

        console.log(donId);

        if(!token) {
            console.log("No token found. Please log in");
            return;
        }
    
        deleteDonation(donId, token);
        getAllDonations();
    }


    // handle DELETE request - Delete Donation
    async function deleteDonation(donId, token) {
        console.log(donId);
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
                else {
                    console.log("Deletion Failed? ", response);
                }            
            } catch (error) {
                console.log("Error deleting donation: ", error);
            }
        }                
    }

    //handle Update
    async function handleUpdate(data) {
        setTask("Update");    
        setOpen(true);

        setDonObj(data);
    }


    // async function handleUpdate(donObj) {
        
    //     const token = await getIdToken();
        
    //     if (!token) {
    //         console.log("No token found. Please log in");
    //         return
    //     }
    //     // console.log("Donation to update: ", donObj);

    //     handleUpdateOpen(); 
    //     setDonObj(donObj);
        
    //     updateDonation(donObj, token);
    //     getAllDonations();
    // }


    // // PATCH request - Update Donation
    // async function updateDonation(donObj, token) {
    //     try {
    //         let request = new Request(`http://localhost:3000/api/donations/${donObj.id}`,
    //             {
    //                 method: "PATCH",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Authorization": `Bearer ${token}`
    //                 },
    //                 body: JSON.stringify(donObj)
    //             }
    //         );

    //         console.log("don Object to update: ", donObj);
    //         console.log("don object id: ", donObj.id);  

    //         handleUpdateOpen();
    //         const response = await fetch(request);

    //         if (response.ok) {
    //             console.log("Donation updated successfully", response);
    //             handleBackdropClose();
    //         } else {
    //             console.log("Failed: ", response);
    //         }
    //     } catch (error) {
    //         console.log("Error updating donation: ", error);
    //     }
    // }

    return(
        <div className="mt-32">
            {user ? (
                <div>
                    <div>
                        <button onClick={handleAddOpen} className="text-emerald-950 border " >Post a Donation <AddCircleOutlineIcon /></button>    
                    </div>                    
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style.modalBox}>
                            <div className="flex flex-row justify-between">
                                {task === "Add" ? (
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Add New Contribution
                                    </Typography>
                                ) : (
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Update Contribution
                                    </Typography>
                                )}                                
                                <CloseIcon onClick={handleClose}/>
                            </div>                        
                            <div className="mb-5">
                                <DonationForm 
                                    handleClose={handleClose} 
                                    getAllDonations={getAllDonations} 
                                    action={task} 
                                    handleUpdate={handleUpdate}
                                    currentDonObj={donObj}    
                                />
                            </div>                            
                        </Box>                        
                    </Modal>   
                    <UserDonationsTable 
                        donations={donationList} 
                        deleteDonation={handleDelete} 
                        updateDonation={handleUpdate}/>               
                </div>
            ) : (
                <p>Please log in to view this page</p>
            )}

        </div>
    );
}

const style = {
    modalBox : {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: '#c5c5c5',
        border: '2px solid #000',
        boxShadow: 24,
        borderRadius: 3,
        p: 4,
    }
  };