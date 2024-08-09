'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';

const startCoords: [number, number] = [-31.4201, -64.1888]; // Córdoba, Argentina
const parisCoords: [number, number] = [48.8566, 2.3522]; // Paris, France
const startDate = new Date('2024-07-28'); // YYYY-MM-DD format
const targetDate = new Date('2024-10-11'); // YYYY-MM-DD format

const daysUntilTarget = Math.ceil((targetDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
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

// Function to check if the position is in the Atlantic Ocean
const isInAtlanticOcean = (position: [number, number]): boolean => {
    const [lat, lng] = position;

    // Define the rough bounding box of the Atlantic Ocean
    const atlanticBounds = [
        { minLat: 0, maxLat: 40, minLng: -60, maxLng: -20 },  // South Atlantic
        { minLat: 40, maxLat: 60, minLng: -50, maxLng: 0 },   // North Atlantic
    ];

    // Check if position is within any of the defined boxes
    return atlanticBounds.some(
        (box) => lat >= box.minLat && lat <= box.maxLat && lng >= box.minLng && lng <= box.maxLng
    );
};


const Map: React.FC<{ mockCurrentDate?: Date }> = ({ mockCurrentDate }) => {
    const [currentPosition, setCurrentPosition] = useState<[number, number]>(startCoords);

    useEffect(() => {
        const updatePosition = () => {
            const today = mockCurrentDate || new Date(); // Use mock date if provided
            const elapsedDays = Math.max(0, Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 3600 * 24)));

            // Update the current position based on elapsed days
            setCurrentPosition(calculatePosition(elapsedDays));
        };

        // Initial position update
        updatePosition();

        // Update position daily
        const interval = setInterval(updatePosition, 86400000); // 24 hours in milliseconds

        return () => clearInterval(interval);
    }, [mockCurrentDate]);

    // Define custom icon with CSS rotation
    const customIcon = (isInOcean: boolean) => {
        const iconUrl = isInOcean ? '/juan.png' : '/juan.png'; // Replace with your image path
        const rotation = isInOcean ? 'rotate(-30deg)' : 'none'; // Tilt image for ocean

        return new L.Icon({
            iconUrl,
            iconSize: [50, 50], // Size of the icon
            iconAnchor: [25, 50], // Point of the icon which will correspond to marker's location
            className: `custom-icon ${isInOcean ? 'in-ocean' : ''}`,
            html: `<div style="transform: ${rotation}; width: 100%; height: 100%; background-image: url(${iconUrl}); background-size: cover; background-position: center;"></div>`,
        });
    };

    const isInOcean = isInAtlanticOcean(currentPosition);
    const markerIcon = customIcon(isInOcean);

    const today = mockCurrentDate || new Date(); // Use mock date if provided
    const elapsedDays = Math.max(0, Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 3600 * 24)));
    const daysLeft = Math.max(0, daysUntilTarget - elapsedDays);

    return (
        <div className="relative h-screen w-full">
            <div className="h-full w-full">
                <MapContainer center={startCoords} zoom={2} className="h-full w-full">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {/* Your moving position */}
                    <Marker position={currentPosition} icon={markerIcon}>
                        <Popup>
                            <span>{daysLeft} jours restants !!</span>
                        </Popup>
                    </Marker>
                    {/* Girlfriend's fixed position */}
                    <Marker position={parisCoords} icon={new L.Icon({
                        iconUrl: '/flo.png', // Replace with your girlfriend's image path
                        iconSize: [50, 50], // Size of the icon
                        iconAnchor: [25, 50], // Point of the icon which will correspond to marker's location
                    })}>
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
