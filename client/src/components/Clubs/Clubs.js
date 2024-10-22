import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import BookClubList from '../BookClubList';
import CreateBookClubForm from '../CreateBookClubForm';

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to fetch clubs
  const fetchClubs = async () => {
    try {
      const response = await axiosInstance.get('/book-clubs'); // API call to fetch clubs
      setClubs(response.data); // Set clubs data to state
      setLoading(false); // Update loading state
    } catch (err) {
      console.error('Error fetching clubs:', err);
      setError('Error loading clubs. Please try again later.');
      setLoading(false);
    }
  };

  // Fetch clubs when component mounts
  useEffect(() => {
    fetchClubs();
  }, []);

  // Handle loading state
  if (loading) return <p>Loading clubs...</p>;
  
  // Handle error state
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Create Club</h2>
      <CreateBookClubForm />
      <h2>My Clubs</h2>
      {clubs.length > 0 ? (
        <ul>
          {clubs.map((club) => (
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
      <BookClubList clubs={clubs} />
    </div>
  );
};

export default Clubs;
