import React, { useEffect, useState } from 'react';
import { getBookings } from '../services/bookingService';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);

  useEffect(() => {
    getBookings()
      .then((data) => {
        console.log('Fetched bookings in Admin Dashboard:', data); // Debugging log
        // Sort bookings by date in descending order (latest first)
        const sortedBookings = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setBookings(sortedBookings);
        setTotalRevenue(sortedBookings.reduce((acc, booking) => acc + (booking.ticketAmount || 0), 0));
        setTotalBookings(sortedBookings.length);
      })
      .catch((error) => {
        console.error('Error fetching bookings in Admin Dashboard:', error); // Debugging log
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      {/* Summary Section */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-100 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-2xl font-bold text-blue-600">${totalRevenue}</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Bookings</h3>
          <p className="text-2xl font-bold text-green-600">{totalBookings}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Remaining Details</h3>
          <p className="text-xl font-bold text-yellow-600">Seats available: TBD</p>
        </div>
      </div>

      {/* Bookings Table */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Customer Name</th>
            <th className="py-2 px-4 border">Movie Title</th>
            <th className="py-2 px-4 border">Seats</th>
            <th className="py-2 px-4 border">Booking Date</th>
            <th className="py-2 px-4 border">Show Time</th>
            <th className="py-2 px-4 border">Ticket Price</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, index) => (
            <tr key={index} className="hover:bg-gray-100 transition">
              <td className="py-2 px-4 border">{b.user || '-'}</td>
              <td className="py-2 px-4 border">{b.name || '-'}</td>
              <td className="py-2 px-4 border font-semibold text-blue-700">{b.movieTitle}</td>
              <td className="py-2 px-4 border text-center">{b.seats}</td>
              <td className="py-2 px-4 border text-center">{b.date}</td>
              <td className="py-2 px-4 border text-center">{b.time}</td>
              <td className="py-2 px-4 border text-center">${b.ticketAmount || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
