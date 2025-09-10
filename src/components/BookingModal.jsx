import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const BookingModal = ({ open, onClose, onBook, movie }) => {
  const { user } = useContext(AuthContext);
  const [seats, setSeats] = useState(1);
  const [showLimit, setShowLimit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  if (!open) return null;

  const handleBook = async () => {
    console.log('Selected Date:', selectedDate); // Debugging log for date
    console.log('Selected Time:', selectedTime); // Debugging log for time

    if (!user) {
      setSuccess('login');
      setTimeout(() => setSuccess(false), 2000);
      return;
    }
    if (Number(seats) > 5) {
      setShowLimit(true);
      setTimeout(() => setShowLimit(false), 2000);
      return;
    }
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time for booking.");
      return;
    }
    if (isNaN(new Date(selectedDate).getTime()) || !selectedTime.match(/^\d{2}:\d{2}$/)) {
      alert("Invalid date or time format. Please select valid values.");
      return;
    }
    setLoading(true);
    await new Promise(res => setTimeout(res, 900)); // Simulate async booking
    setLoading(false);
    setSuccess({
      date: selectedDate,
      time: selectedTime,
    });
    setTimeout(() => {
      setSuccess(false);
      onBook({
        seats: Number(seats),
        date: selectedDate,
        time: selectedTime,
        name: user.displayName || 'Hemanth',
        ticketAmount: Number(seats) * 20, // Updated ticket price
      });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-all duration-300">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 relative animate-fadeIn">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl font-bold">&times;</button>
        <h2 className="text-2xl font-extrabold mb-4 text-gray-800 tracking-tight">Book: <span className="text-blue-600">{movie.title}</span></h2>
        <label className="block mb-4 text-gray-700 font-medium">Seats:
          <input
            type="number"
            min="1"
            max="5"
            value={seats}
            onChange={e => setSeats(e.target.value)}
            className="ml-2 border border-gray-300 p-2 rounded-lg w-20 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            disabled={loading || success}
          />
        </label>
        <label className="block mb-4 text-gray-700 font-medium">Date:
          <input
            type="date"
            value={selectedDate}
            onChange={e => {
              setSelectedDate(e.target.value);
              console.log('Updated Date:', e.target.value); // Debugging log for date input
            }}
            className="ml-2 border border-gray-300 p-2 rounded-lg w-36 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            disabled={loading || success}
          />
        </label>
        <label className="block mb-4 text-gray-700 font-medium">Time:
          <input
            type="time"
            value={selectedTime}
            onChange={e => {
              setSelectedTime(e.target.value);
              console.log('Updated Time:', e.target.value); // Debugging log for time input
            }}
            className="ml-2 border border-gray-300 p-2 rounded-lg w-28 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            disabled={loading || success}
          />
        </label>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            disabled={loading || success}
          >Cancel</button>
          <button
            onClick={handleBook}
            className={`px-4 py-2 rounded-lg font-semibold transition bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-md flex items-center gap-2 ${loading || success ? 'opacity-60 cursor-not-allowed' : 'hover:from-green-500 hover:to-blue-600'}`}
            disabled={loading || success}
          >
            {loading && (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
            )}
            {success ? 'Booked!' : 'Book'}
          </button>
        </div>
        {showLimit && (
          <div className="mt-6 animate-bounce bg-red-500 text-white px-4 py-2 rounded-lg text-center font-semibold shadow">Limit exceeded: Max 5 tickets allowed</div>
        )}
        {success && success === 'login' && (
          <div className="mt-6 animate-fadeIn bg-red-500 text-white px-4 py-2 rounded-lg text-center font-semibold shadow">
            Please login to book tickets.
          </div>
        )}
        {success && typeof success === 'object' && (
          <div className="mt-6 animate-fadeIn bg-green-500 text-white px-4 py-2 rounded-lg text-center font-semibold shadow">
            <div>You have booked successfully!</div>
            <div className="text-sm mt-2 font-normal">Date: <span className="font-bold">{success.date}</span></div>
            <div className="text-sm font-normal">Time: <span className="font-bold">{success.time}</span></div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95);} to { opacity: 1; transform: scale(1);} }
        .animate-fadeIn { animation: fadeIn 0.4s ease; }
      `}</style>
    </div>
  );
};

export default BookingModal;
