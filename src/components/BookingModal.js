import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { bookMovie } from '../services/bookingService';

const BookingModal = ({ open, onClose, movie }) => {
  const { user } = useContext(AuthContext);
  const [seats, setSeats] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("10:00");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  if (!open) return null;

  const handleBook = async () => {
    if (!user) {
      alert('Please login to book tickets.');
      return;
    }
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time for booking.');
      return;
    }
    setLoading(true);
    const ticketPrice = 20; // Ticket price per seat
    const totalAmount = seats * ticketPrice;
    const bookingData = {
      user: user.email,
      movieTitle: movie.title,
      seats,
      date: selectedDate,
      time: selectedTime,
      ticketAmount: totalAmount,
    };
    await bookMovie(bookingData);
    setLoading(false);
    setSuccessMessage(`Booking successful!\nMovie: ${movie.title}\nDate: ${selectedDate}\nTime: ${selectedTime}`);
    setTimeout(() => {
      setSuccessMessage(null);
      onClose();
    }, 3000);
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      times.push(`${hour.toString().padStart(2, '0')}:00`);
      times.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    return times;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl font-bold">&times;</button>
        <h2 className="text-2xl font-bold mb-4">Book: {movie.title}</h2>
        <label className="block mb-4">
          Seats:
          <input
            type="number"
            min="1"
            max="5"
            value={seats}
            onChange={e => setSeats(e.target.value)}
            className="ml-2 border border-gray-300 p-2 rounded-lg w-20"
          />
        </label>
        <label className="block mb-4">
          Date:
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className="ml-2 border border-gray-300 p-2 rounded-lg w-36"
          />
        </label>
        <label className="block mb-4">
          Time:
          <select
            value={selectedTime}
            onChange={e => setSelectedTime(e.target.value)}
            className="ml-2 border border-gray-300 p-2 rounded-lg w-28"
          >
            {generateTimeOptions().map((time, index) => (
              <option key={index} value={time}>{time}</option>
            ))}
          </select>
        </label>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
          <button
            onClick={handleBook}
            className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Booking...' : 'Book'}
          </button>
        </div>
        {successMessage && (
          <div className="absolute top-0 left-0 right-0 bg-green-500 text-white text-center py-2 rounded-t-2xl">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
