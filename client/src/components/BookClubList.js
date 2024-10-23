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
      // Optionally, refresh the list of book clubs or update the UI state
      // You can fetch the book clubs again to update the view
      // fetchBookClubs();
    } catch (err) {
      console.error('Error joining book club:', err);
      alert('Error joining the book club. Please try again.');
    }
  };

  return (
    <div>
      <h3>Available Book Clubs</h3>
      <ul>
        {bookClubs.map((club) => (
          <li key={club.id}>
            <h4>{club.name}</h4>
            <p>{club.description}</p>
            <p><strong>Current Book:</strong> {club.currentBook}</p>
            <p><strong>Chapters to Read:</strong> {club.currentChapters}</p>
            <p><strong>Book Description:</strong> {club.bookDescription}</p>
            <button onClick={() => handleJoinClub(club.id)}>Join</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookClubList;
