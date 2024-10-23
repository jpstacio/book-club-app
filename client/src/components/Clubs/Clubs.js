import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import CreateBookClubForm from '../CreateBookClubForm';

const Clubs = () => {
  const [myClubs, setMyClubs] = useState([]);
  const [availableClubs, setAvailableClubs] = useState([]);
  const [loadingMyClubs, setLoadingMyClubs] = useState(true);
  const [loadingAvailableClubs, setLoadingAvailableClubs] = useState(true);
  const [error, setError] = useState('');

  const fetchMyClubs = async () => {
    try {
      const response = await axiosInstance.get('/book-clubs', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setMyClubs(response.data);
      setLoadingMyClubs(false);
    } catch (err) {
      console.error('Error fetching my clubs:', err);
      setError('Error loading my clubs. Please try again later.');
      setLoadingMyClubs(false);
    }
  };

  const fetchAvailableClubs = async () => {
    try {
      const response = await axiosInstance.get('/book-clubs/available', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setAvailableClubs(response.data);
      setLoadingAvailableClubs(false);
    } catch (err) {
      console.error('Error fetching available clubs:', err);
      setError('Error loading available clubs. Please try again later.');
      setLoadingAvailableClubs(false);
    }
  };

  const handleJoinClub = async (clubId) => {
    try {
      await axiosInstance.post(`/book-clubs/${clubId}/join`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Successfully joined the book club!');
      fetchMyClubs(); // Refresh my clubs after joining
      fetchAvailableClubs(); // Refresh available clubs
    } catch (err) {
      console.error('Error joining book club:', err);
      alert('Error joining the book club. Please try again.');
    }
  };

  useEffect(() => {
    fetchMyClubs();
    fetchAvailableClubs();
  }, []);

  if (loadingMyClubs || loadingAvailableClubs) return <p>Loading clubs...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Create Club</h2>
      <CreateBookClubForm />
      <h2>My Clubs</h2>
      {myClubs.length > 0 ? (
        <ul>
          {myClubs.map((club) => (
            <li key={club.id}>
              <h3>{club.name}</h3>
              <p>{club.description}</p>
              <p><strong>Current Book:</strong> {club.currentBook}</p>
              <p><strong>Chapters to Read:</strong> {club.currentChapters}</p>
              <p><strong>Book Description:</strong> {club.bookDescription}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>You are not part of any clubs yet.</p>
      )}
      <h2>Available Book Clubs</h2>
      {availableClubs.length > 0 ? (
        <ul>
          {availableClubs.map((club) => (
            <li key={club.id}>
              <h3>{club.name}</h3>
              <p>{club.description}</p>
              <p><strong>Current Book:</strong> {club.currentBook}</p>
              <p><strong>Chapters to Read:</strong> {club.currentChapters}</p>
              <p><strong>Book Description:</strong> {club.bookDescription}</p>
              <button onClick={() => handleJoinClub(club.id)}>Join</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No available book clubs to join.</p>
      )}
    </div>
  );
};

export default Clubs;
