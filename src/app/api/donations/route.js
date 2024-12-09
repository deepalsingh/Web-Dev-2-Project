import { collectionGroup, getDocs } from "firebase/firestore";
import { db } from "../../_utils/firebase";

export async function GET(request) {
    try {
        // const dQuery = collectionGroup(db, "donations");
        const querySnapshot = await getDocs(collectionGroup(db, "donations"));
                
        if (querySnapshot.empty) {
            console.log(`No donation items found`);
            return response.status(200).json([]);
        }

        let donationsList = [];

        querySnapshot.forEach((doc) => {
            let thisDoc = {
                id: doc.id,
                ...doc.data()
            };
            donationsList.push(thisDoc);
        });

        return new Response(JSON.stringify(donationsList), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });

    } catch (error) {
        console.error("Error getting donation items from database: ", error);
        return new Response(
            JSON.stringify({ message: "Error fetching donations" }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            }
          );
    }
}