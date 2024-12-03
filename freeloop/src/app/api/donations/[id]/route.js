import { deleteDoc, getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import admin from "firebase-admin";
import { db } from "../../../_utils/firebase";


// import { z } from 'zod';

// GET Donation by ID
export async function GET(request, {params}) {

    try {
        const { id } = await params;
    

    } catch (error) {
        
    }
}

// PATCH: Update Donation by ID
export async function PATCH(request, {params}) {

    try {
        const authHeader = request.headers.get("authorization");
        const token = authHeader?.split(" ")[1];

        if (!token) {
            return new Response(
                JSON.stringify({ message: "Authorization token missing" }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

        const decodedToken = await admin.auth().verifyIdToken(token);
        const userId = decodedToken.uid;

        const { id } = await params;
        console.log("ID: ", id);
        
        const updateData = await request.json();          
        const docRef = doc(db, "users", userId, "donations", id);

        const currentDoc = await getDoc(docRef);

        if (currentDoc.exists()) {
            await updateDoc(docRef, updateData);
            return new Response(
                JSON.stringify({ message: "Donation updated successfully" }),
                { status: 200, headers: { "Content-Type": "application/json" } }
            );            
        } else {
            return new Response(
                JSON.stringify({ message: "Document not found" }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }        
    } catch (error) {
        console.log("Error updating document: ", error);        
    }
}

// DELETE: Delete Donation by ID
export async function DELETE(request, {params}) {

    try {
        const authHeader = request.headers.get("authorization");
        const token = authHeader?.split(" ")[1];

        if (!token) {
            return new Response(
                JSON.stringify({ message: "Authorization token missing" }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

        const decodedToken = await admin.auth().verifyIdToken(token);
        const userId = decodedToken.uid;

        const { id } = await params;

        //reference document and delete from db
        const docRef = doc(db, "users", userId, "donations", id);
  
        await deleteDoc(docRef);

        console.log(`Document with ID ${id} deleted successfully`);
        return new Response(
            JSON.stringify({ message: "Donation deleted successfully" }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) { 
        console.log("Error deleting document: ", error);

        if (error.code === "not-found") {
            return new Response(
                JSON.stringify({ message: "Donation not found" }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        return new Response(
            JSON.stringify({ message: "Internal Server Error", error: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}