"use client"

import { useState } from "react";
import { useUserAuth } from "@/app/_utils/auth-context";
import { useForm, reset } from "react-hook-form";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { getDateTimeNow } from "@/app/_utils/dateUtils";
// import { set } from "zod";
import { fieldOptions } from "../constants/fieldOptions";


export default function DonationForm({ handleClose, getAllDonations, action, currentDonObj }) {

    // console.log("Action to perform:", action);
    // console.log("Received Donation Object:", currentDonObj);

    const { getIdToken } = useUserAuth();
    const [backdropOpen, setBackdropOpen] = useState(false);

    const [dTitle, setDTitle] = useState("");
    const [dCategory, setDCategory] = useState("");
    const [dCondition, setDCondition] = useState("");
    const [dDescription, setDDescription] = useState("");
    const [dImages, setDImages] = useState([]);
    const [dLocation, setDLocation] = useState("Calgary, AB");
    const [dStatus, setDStatus] = useState("Available");

    const handleDTitleChange = (event) => setDTitle(event.target.value);
    const handleDCategoryChange = (event) => setDCategory(event.target.value);
    const handleDConditionChange = (event) => setDCondition(event.target.value);
    const handleDDescriptionChange = (event) => setDDescription(event.target.value);
    const handleDImagesChange = (event) => setDImages(event.target.value.split(','));
    const handleDLocationChange = (event) => {
        try {
            setDLocation(event.target.value)
        } catch (error) {
            console.log("Error setting location: ", error);
        }
    };
    const handleDStatusChange = (event) => setDStatus(event.target.value);

    // const handleImageChange = async (event) => {
    //     const files = Array.from(event.target.files);                    // get selected files
    //     const uploadedUrls = [];

    //     for (const file of files) {
    //         const storageRef = ref(storage, `donations/${file.name}`);
    //         await uploadBytes(storageRef, file);                         // store file
    //         const downloadURL = await getDownloadURL(storageRef);        // get the url
    //         uploadedUrls.push(downloadURL);
    //     }

    //     setDImages(uploadedUrls); 
    // };

    const { register, handleSubmit, reset, formState: { errors } } = useForm({

        defaultValues: action === "Add" ? {
            title: "",
            category: "",
            condition: "",
            description: "",
            location: "Calgary, AB",
            status: "Available",
            images: []
        } : {
            title: currentDonObj?.title || "",
            category: currentDonObj?.category || "Miscellaneous",
            condition: currentDonObj?.condition || "New",
            description: currentDonObj?.description || "",
            location: currentDonObj?.location || "Calgary, AB",
            status: currentDonObj?.status || "Available",
            images: currentDonObj?.images || []
        }
    });


    const resetAddFields = () => {
        setDTitle("");
        setDCategory("");
        setDCondition("");
        setDDescription("");
        setDLocation("Calgary, AB");
        setDImages([]);
    };


    // handle Add Donation 
    async function handleAdd(data) {
        const token = await getIdToken();

        if (!token) {
            console.log("No token found. Please log in");
            return
        }

        const donObj = {
            title: data.title,
            category: data.category,
            condition: data.condition,
            description: data.description,
            images: data.images,
            status: 'Available',
            location: data.location,
            createdAt: getDateTimeNow(),
            updatedAt: getDateTimeNow(),
        };

        console.log("object to add:", donObj);

        await addDonation(donObj, token);
        getAllDonations();
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

            handleBackdropOpen();
            const response = await fetch(request);

            if (response.ok) {
                // setDonationList([...donationList, donationObj]);
                // setDonationList((prevList) => [...prevList, addedDonation]);
                // handleBackdropClose();
                // resetAddFields();
                // handleClose();
                console.log("Donation added successfully", response);
            } else {
                console.log("Failed: ", response);
            }
        } catch (error) {
            // resetAddFields();
            // handleClose();
            console.log("Error adding donation: ", error);
        }

        handleBackdropClose();
        resetAddFields();
        handleClose();
    }


    // handle Update
    async function handleUpdate(donObj) {
        // console.log("donation obj:", donObj);
        donObj.id = currentDonObj.id;
        donObj.updatedAt = getDateTimeNow();

        const token = await getIdToken();

        if (!token) {
            console.log("No token found. Please log in");
            return
        }

        await updateDonation(donObj, token);
        getAllDonations();
    }


    // PATCH request - Update Donation
    async function updateDonation(donObj, token) {
        try {
            let request = new Request(`http://localhost:3000/api/donations/${donObj.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(donObj)
                }
            );

            handleBackdropOpen();

            const response = await fetch(request);

            if (response.ok) {
                console.log("Donation updated successfully", response);
            } else {
                console.log("Failed: ", response);
            }
        } catch (error) {
            console.log("Error updating donation: ", error);
        }

        handleBackdropClose();
        resetAddFields();
        handleClose();
    }

    const handleBackdropClose = () => setBackdropOpen(false);
    const handleBackdropOpen = () => setBackdropOpen(true);


    return (
        <form onSubmit={handleSubmit(action === "Add" ? handleAdd : handleUpdate)}>
            <div className={formContainer}>
                <label className={formLabel}>Condition</label>
                <select
                    {...register("condition", { required: "Please select a condition" })}
                    className={formInput}
                    defaultValue={action === "Add" ? null : currentDonObj?.condition || ""}>
                    <option value="">Select Condition</option>
                    <option value="New">New</option>
                    <option value="Used">Used</option>
                </select>
                {errors.condition && <p className={errorStyle}>{errors.condition.message}</p>}
            </div>
            <div className={formContainer}>
                <label className={formLabel}>Title</label>
                <div className="flex flex-col">
                    <input
                        {...register("title", { required: "Please enter a Title" })}
                        className={formInput} onChange={handleDTitleChange} value={dTitle} type="text" />
                    {errors.title && <p className={errorStyle}>{errors.title.message}</p>}
                </div>
            </div>
            <div className={formContainer}>
                <label className={formLabel}>Category</label>
                <select
                    {...register("category", { required: "Please select a category" })}
                    className={formInput}
                    defaultValue={action === "Add" ? null : currentDonObj?.category || ""}>
                    <option value="">Select a Category</option>
                    {Array.isArray(fieldOptions.donationCategory) && fieldOptions.donationCategory.length > 0 &&
                        fieldOptions.donationCategory.map((category, index) => {
                            return (
                                <option key={index} value={category.value}>{category.label}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className={formContainer}>
                <label className={formLabel}>Location</label>
                <select
                    className={formInput}
                    {...register("location")}
                    defaultValue={action === "Add" ? "" : currentDonObj?.location || ""}>
                    {Array.isArray(fieldOptions.donationLocation) && fieldOptions.donationLocation.length > 0 &&
                        fieldOptions.donationLocation.map((location, index) => {
                            return (
                                <option key={index} value={location.value}>{location.label}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className={formContainer}>
                <label className={formLabel}>Images</label>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    className={formInput}
                    onChange={handleDImagesChange}
                />
            </div>
            {action === "Update" ? (
                <div className={formContainer}>
                    <label className={formLabel}>Status</label>
                    <select
                        className={formInput}
                        defaultValue={action === "Add" ? "Available" : currentDonObj?.status || ""}>
                        <option value="Available">Available</option>
                        <option value="Pending">Pending</option>
                        <option value="Taken">Taken</option>
                    </select>
                </div>
            ) : null}
            <div className={formContainer}>
                <label className={formLabel}>Description</label>
                <div className="flex flex-col">
                    <textarea
                        {...register("description", {
                            required: "Please enter a description",
                            maxLength: { value: 500, message: "Description cannot exceed 500 characters." }
                        })}
                        className={formTextArea}
                        defaultValue={action === "Add" ? "" : currentDonObj?.description || ""} />
                    {errors.description && <p className={errorStyle}>{errors.description.message}</p>}
                </div>
            </div>
            <div className="flex justify-center mt-6">
                <div className="flex justify-center w-48 h-10 border border-slate-500 bg-slate-800 text-emerald-400 rounded-3xl active:text-emerald-800 hover:bg-zinc-50 hover:text-emerald-950">
                    <button className="w-30" type="submit">{action === "Add" ? <p>Submit Donation</p> : <p>Submit Update</p>}</button>
                </div>
            </div>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={backdropOpen}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </form>
    );
}

const formContainer = "m-2 flex flex-row justify-between items-center";
const formLabel = "text-slate-800 ";
const formInput = "border border-emerald-900 ml-3 h-8 p-2 rounded-md text-sm shadow-md hover:shadow-lg focus:shadow-3xl";
const formTextArea = "w-72 h-64" + formInput;
const errorStyle = "text-red-500 text-sm";


// "location": {
//   "city": "Calgary",
//   "state": "Alberta",
//   "country": "Canada",
//   "coordinates": {
//     "latitude": 51.0447,
//     "longitude": -114.0719
//   }
// }