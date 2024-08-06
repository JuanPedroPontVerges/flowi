// app/components/Map.tsx
'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';

const startCoords: [number, number] = [-31.4201, -64.1888]; // Córdoba, Argentina
const parisCoords: [number, number] = [48.8566, 2.3522]; // Paris, France
const targetDate = new Date('2024-10-11');
const today = new Date();

const daysUntilTarget = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
const totalDistance: [number, number] = [
    parisCoords[0] - startCoords[0],
    parisCoords[1] - startCoords[1],
];

const calculatePosition = (days: number): [number, number] => {
    if (days >= daysUntilTarget) {
        return parisCoords; // Reached the target date
    }
    const latDiff = totalDistance[0] / daysUntilTarget;
    const lngDiff = totalDistance[1] / daysUntilTarget;
    return [startCoords[0] + latDiff * days, startCoords[1] + lngDiff * days];
};

const Map: React.FC = () => {
    const [days, setDays] = useState(0);
    const [currentPosition, setCurrentPosition] = useState<[number, number]>(startCoords);

    useEffect(() => {
        const storedDays = localStorage.getItem('days');
        if (storedDays) {
            const parsedDays = parseInt(storedDays, 10);
            setDays(parsedDays);
            setCurrentPosition(calculatePosition(parsedDays));
        }

        const interval = setInterval(() => {
            setDays((prevDays) => {
                const newDays = prevDays + 1;
                const newPosition = calculatePosition(newDays);
                setCurrentPosition(newPosition);
                localStorage.setItem('days', newDays.toString());
                return newDays;
            });
        }, 86400000); // 24 hours in milliseconds

        return () => clearInterval(interval);
    }, []);

    // Custom icon for your image
    const yourIcon = new L.Icon({
        iconUrl: '/juan.png', // Replace with your image path
        iconSize: [50, 50], // Size of the icon
        iconAnchor: [25, 50], // Point of the icon which will correspond to marker's location
    });

    // Custom icon for your girlfriend's image
    const girlfriendIcon = new L.Icon({
        iconUrl: '/flo.png', // Replace with your girlfriend's image path
        iconSize: [50, 50], // Size of the icon
        iconAnchor: [25, 50], // Point of the icon which will correspond to marker's location
    });

    const daysLeft = daysUntilTarget - days;
    return (
        <div className="relative h-screen w-full">
            <div className="h-full w-full">
                <MapContainer center={startCoords} zoom={2} className="h-full w-full">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {/* Your moving position */}
                    <Marker position={currentPosition} icon={yourIcon}>
                        <Popup>
                            <span>{daysLeft} jours restants !!</span>
                        </Popup>
                    </Marker>
                    {/* Girlfriend's fixed position */}
                    <Marker position={parisCoords} icon={girlfriendIcon}>
                        <Popup>
                            <span>Mushi hunter 🍄‍🟫🍄</span>
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
};

export default Map;
