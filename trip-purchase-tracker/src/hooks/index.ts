import { useState, useEffect } from 'react';

export const useTrip = () => {
    const [trips, setTrips] = useState([]);

    const addTrip = (trip) => {
        setTrips((prevTrips) => [...prevTrips, trip]);
    };

    const removeTrip = (tripId) => {
        setTrips((prevTrips) => prevTrips.filter(trip => trip.id !== tripId));
    };

    return { trips, addTrip, removeTrip };
};

export const usePurchase = () => {
    const [purchases, setPurchases] = useState([]);

    const addPurchase = (purchase) => {
        setPurchases((prevPurchases) => [...prevPurchases, purchase]);
    };

    const removePurchase = (purchaseId) => {
        setPurchases((prevPurchases) => prevPurchases.filter(purchase => purchase.id !== purchaseId));
    };

    return { purchases, addPurchase, removePurchase };
};