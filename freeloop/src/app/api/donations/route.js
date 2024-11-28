import { collection, addDoc, getDocs, query } from "firebase/firestore";
import { db } from "../../_utils/firebase";
import { z } from "zod";
import admin from "firebase-admin";
require('dotenv').config(); 

// Initialize Firebase Admin SDK
const serviceAccount = require("/Users/user/Documents/keys-random/freeloop-firebase-serviceaccount-key.json"); 

// if (!admin.apps.length) {
//     admin.initializeApp({
//     // credential: admin.credential.cert(serviceAccount),
//         credential: admin.credential.applicationDefault(),
//     });
// }

if (!admin.apps.length) {
    admin.initializeApp({
        // credential: admin.credential.applicationDefault(),
        credential: admin.credential.cert(serviceAccount),
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
}
console.log("Firebase Project ID:", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);



const donationSchema = z.object({
    userId: z.string(),
    title: z.string(),
    description: z.string(),
    category: z.enum(["clothes", "food", "electronics"]),
    condition: z.enum(["New", "Used"]),
    images: z.nullable(z.array(z.string())), // Assuming images are URLs or null
    location: z.string(),
    status: z.enum(["Available", "Taken", "Pending"]),
    createdAt: z.string().nullable(),
    updatedAt: z.string().nullable(),
});

// GET: all Donations
export async function GET() {
    const { user } = useUserAuth(); 
    const userId = user.id;

    try {
        const querySnapshot = await getDocs(query(collection(db, "users", userId, "donations")));
        let donationsList = [];

        if (querySnapshot.empty) {
            console.log(`No donation items found for user: ${userId}`);
            return new Response(JSON.stringify([]), { status: 200 });
        }

        querySnapshot.forEach((doc) => {
            let thisDonation = {
            id: doc.id,
            ...doc.data()
            };
            donationsList.push(thisDonation);
        });

        return new Response(JSON.stringify(donationsList), { status: 200 });

    } catch (e) {
        console.error("Error getting donation items from database: ", e);
        return new Response("Error fetching donations", { status: 500 });
    }
}



// POST: add new Donation
export async function POST(request) {

    console.log("Authorization Header Received (server-side):", request.headers.get("authorization"));
    

    // Extract the token from the Authorization header
    const authHeader = request.headers.get("authorization");
    console.log("Extracted authorization:", authHeader);

    const token = authHeader?.split(" ")[1];

    if (!token) {
        return new Response(
            JSON.stringify({ message: "Authorization token missing" }),
            { status: 401, headers: { "Content-Type": "application/json" } }
        );
    }

    try {
        // Verify token using Firebase Admin SDK
        const decodedToken = await admin.auth().verifyIdToken(token);
        console.log("Decoded user token:", decodedToken);

        const userId = decodedToken.uid;
        
        const newDonation = await request.json();
    
        // Validate the incoming donation data against the schema
        // donationSchema.parse(newDonation);

        const docRef = await addDoc(collection(db, "users", userId, "donations"), newDonation);

        return new Response(
            JSON.stringify({ id: docRef.id, ...newDonation}), 
            { status: 201, headers: { "Content-Type": "application/json" } }
        );

    } catch (error) {
        console.error("Error processing donation:", error);
        return new Response(
            JSON.stringify({ message: "Internal server error", error: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
