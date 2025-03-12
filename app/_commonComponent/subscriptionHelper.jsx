"use client";
import { useEffect, useState, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

const CreateSubscription = () => {
    
    const { user } = useUser();
    const [subscriptionChecked, setSubscriptionChecked] = useState(false);

    

    const checkAndCreateSubscription = useCallback( async () => {
        if (!user || subscriptionChecked) return; // Prevent redundant calls

        const localSubStatus = localStorage.getItem("subscriptionExists");

        if (localSubStatus === "true") {
            console.log("Subscription found in localStorage. Skipping API call.");
            setSubscriptionChecked(true);
            return;
        }

        try {
            const email = user?.primaryEmailAddress?.emailAddress;
          

            const response = await axios.post("/api/subscription/create", {
                userId: user.id,
                email,
            });

           
            localStorage.setItem("subscriptionExists", "true");
            setSubscriptionChecked(true);
        } catch (error) {
            console.error("Error creating subscription:", error.response?.data || error.message);
        }
    }, [user, subscriptionChecked]);

    useEffect(() => {
        checkAndCreateSubscription();
    }, [checkAndCreateSubscription]);

    return null;
};

export default CreateSubscription;
