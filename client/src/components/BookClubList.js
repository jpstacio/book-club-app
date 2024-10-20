import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const BookClubList = () => {
  const [bookClubs, setBookClubs] = useState([]);

  useEffect(() => {
    const fetchBookClubs = async () => {
      try {
        const response = await axiosInstance.get('/book-clubs');
        setBookClubs(response.data);
      } catch (err) {
        console.error('Error fetching book clubs:', err);
      }
    };

    fetchBookClubs();
  }, []);

  const handleJoinClub = async (clubId) => {
    try {
      await axiosInstance.post(`/book-clubs/${clubId}/join`);
      alert('Successfully joined the book club!');
    } catch (err) {
      console.error('Error joining book club:', err);
    }
  };

  return (
    <div>
      <h3>Available Book Clubs</h3>
      <ul>
        {bookClubs.map((club) => (
          <li key={club.id}>
            {club.name}
            <button onClick={() => handleJoinClub(club.id)}>Join</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookClubList;
