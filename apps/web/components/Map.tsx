"use client";

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
    theme: string;
}

const Map = ({ theme }: MapProps) => {
    const position: [number, number] = [-24.0458, -52.3838]; // Campo Mourão, Paraná

    // CartoDB Tiles
    const lightTiles = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
    const darkTiles = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

    const customIcon = React.useMemo(() => new L.DivIcon({
        className: 'bg-transparent',
        html: `
            <div class="relative w-12 h-12 -translate-x-1/2 -translate-y-full">
                <svg viewBox="0 0 24 24" fill="${theme === 'dark' ? '#ffffff' : '#000000'}" stroke="${theme === 'dark' ? '#ffffff' : '#000000'}" stroke-width="2" class="w-full h-full drop-shadow-md filter">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                </svg>
                <div class="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-6 flex items-center justify-center">
                    <img src="/icon-marialis.svg" class="w-3.5 h-3.5 object-contain ${theme === 'dark' ? 'brightness-0' : 'brightness-0 invert'}" alt="Marialis" />
                </div>
            </div>
        `,
        iconSize: [48, 48],
        iconAnchor: [24, 48],
        popupAnchor: [0, -48]
    }), [theme]);

    return (
        <MapContainer
            center={position}
            zoom={13}
            style={{ height: '100%', width: '100%', borderRadius: '1rem' }}
            attributionControl={false}
            zoomControl={false}
        >
            <TileLayer
                url={theme === 'dark' ? darkTiles : lightTiles}
            />
            <Marker position={position} icon={customIcon}>
                <Tooltip direction="top" offset={[0, -50]} opacity={1} className="custom-tooltip">
                    <div className="text-center px-2 py-1">
                        <strong className="block text-sm font-bold text-gray-900">Marialis Cosméticos</strong>
                        <span className="text-xs text-gray-600 font-medium">+55 44 8850-0440</span>
                    </div>
                </Tooltip>
            </Marker>
        </MapContainer>
    );
};

export default Map;
