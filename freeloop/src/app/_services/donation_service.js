import { collection, addDoc, getDocs } from "firebase/firestore";
// import { db } from "../firebase";

export async function createDonation(userId, donationObj) {
    try {
        const docRef = await addDoc(collection(db, "users", userId, "donations"), donationObj);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding donation item: ", e);
    }
}

export async function dbGetAllDonations(userId, donationListSetter) {
    try {
        const querySnapshot = await getDocs(query(collection(db, "users", userId, "donations")));
        let donationsList = [];

        if (querySnapshot.empty) {
            console.log(`No donation items found for user: ${user.id}`);
            donationListSetter([]);
            return;
        }   

        querySnapshot.forEach((doc) => {
            // donations.push(doc.data());
            let thisDonation = {
                id: doc.id,
                ...doc.data()
            }
            donationsList.push(thisDonation);
        });
        donationListSetter(donationsList);
        
    } catch (e) {
        console.log("Error getting donation items: ", e);
    }
}

