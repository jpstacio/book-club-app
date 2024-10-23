import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useParams } from 'react-router-dom';

const BookClubPage = () => {
  const { id } = useParams(); // Get book club ID from URL parameters
  const [bookClub, setBookClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookClub = async () => {
      try {
        const response = await axiosInstance.get(`/book-clubs/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setBookClub(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching book club:', err);
        setError('Error loading book club details. Please try again later.');
        setLoading(false);
      }
    };

    fetchBookClub();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>{bookClub?.name}</h2>
      <p>{bookClub?.description}</p>
      <h3>Current Book: {bookClub?.currentBook}</h3>
      <p>Chapters to Read This Week: {bookClub?.currentChapters}</p>
      <p>Book Description: {bookClub?.bookDescription}</p>
    </div>
  );
};

export default BookClubPage;
