import React, { useState, useEffect } from "react";
import BookingForm from "../component/BookingForm";

const HotelPage = () => {
    const [hotels, setHotels] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState(null);

    useEffect(() => {
        fetch("/hotels.json")
            .then(response => response.json())
            .then(data => setHotels(data));
    }, []);


    return (
        <div className="relative min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-center mb-6">Available Hotels</h1>

            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 transition-all duration-300 ${selectedHotel ? "blur-md" : ""}`}>
                {hotels.map((hotel) => (
                    <div key={hotel.id} className="border rounded-lg p-4 shadow-md">
                        <img src={hotel.image} alt={hotel.name} className="w-full h-40 object-cover rounded-lg" />
                        <h2 className="text-xl font-bold mt-2">{hotel.name}</h2>
                        <p className="text-gray-500">{hotel.location}</p>
                        <p className="text-lg font-semibold">${hotel.price} / day</p>
                        <p className="text-yellow-500">⭐ {hotel.rating}</p>
                        <button
                            className="w-full bg-blue-500 text-white p-2 mt-3 rounded-lg hover:bg-blue-600 transition"
                            onClick={() => setSelectedHotel(hotel)}
                        >
                            Book Now
                        </button>
                    </div>
                ))}
            </div>

            {selectedHotel && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <BookingForm hotel={selectedHotel} onClose={() => setSelectedHotel(null)} />
                </div>
            )}
        </div>
    );
};

export default HotelPage;
