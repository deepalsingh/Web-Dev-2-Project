import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { object } from "zod";


export default function DonationsList() {
    const [donationList, setDonationList] = useState([]);
    const [error, setError] = useState(null);

    const fetchDonations = async () => {
        try {
            const response = await fetch("/api/donations", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                cache: "no-store",
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch donations: ${response.statusText}`);
            }

            const donations = await response.json();
            setDonationList(donations);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchDonations();
    }, []);

    if (error) {
        return <div>Error: {error.toString()}</div>;
    }

    return (
        <div className="grid grid-cols-3 space-x-4 mt-14">
            {donationList.length === 0 ? (
                <div>No Donations Available</div>
            ) : (
                donationList.map((donObj) => (
                    <div key={donObj.id} className="">
                        <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={donObj.image}
                                    alt={donObj.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {donObj.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {donObj.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </div>

                ))
            )}

        </div>
    );
}
