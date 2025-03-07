import React, { useState } from "react";
import API from "../Api";

const BookingForm = ({ hotel, onClose }) => {
    const [numRooms, setNumRooms] = useState(1);
    const [amount, setAmount] = useState(hotel.price)
    const [familyMembers, setFamilyMembers] = useState([{ name: "", aadhaar: "" }]);

    const addFamilyMember = () => {
        setFamilyMembers([...familyMembers, { name: "", aadhaar: "" }]);
    };

    const handleNumberOfRooms = (e) => {
        const rooms = parseInt(e.target.value, 10) || 0;
        setNumRooms(rooms);
        setAmount(rooms * hotel.price);
    };

    const handleInputChange = (index, field, value) => {
        const updatedMembers = [...familyMembers];
        updatedMembers[index][field] = value;
        setFamilyMembers(updatedMembers);
    };

    const handleSubmit = async (e) => {
        try {
            const data = {
                name: hotel.name,
                price: amount,
                members: familyMembers,
                userId: localStorage.getItem("id")
            }
            const response = await API.post('/book-hotel', { data });
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Booking for {hotel.name}</h2>
            <form onSubmit={handleSubmit}>

                <label className="block font-semibold mb-2">Number of Rooms</label>
                <input
                    type="number"
                    min="1"
                    value={numRooms}
                    onChange={(e) => handleNumberOfRooms(e)}
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                />
                <label className="block font-semibold mb-2">Total Amount : {amount} $</label>

                <h3 className="text-lg font-semibold">Family Members</h3>
                {familyMembers.map((member, index) => (
                    <div key={index} className="mb-3 flex gap-4">
                        <input
                            type="text"
                            placeholder="Member Name"
                            value={member.name}
                            onChange={(e) => handleInputChange(index, "name", e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                        />
                        <input
                            type="text"
                            placeholder="Aadhaar Number"
                            value={member.aadhaar}
                            onChange={(e) => handleInputChange(index, "aadhaar", e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addFamilyMember}
                    className="w-full bg-blue-100 text-black py-2 rounded-lg hover:bg-blue-300 transition mb-4"
                >
                    + Add Family Member
                </button>

                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Confirm Booking
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BookingForm;
