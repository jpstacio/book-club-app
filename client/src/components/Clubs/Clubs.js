import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchClubs = async () => {
    try {
      const response = await axiosInstance.get('/book-clubs');
      setClubs(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching clubs:', err);
      setError('Error loading clubs. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  if (loading) return <p>Loading clubs...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>My Clubs</h2>
      {clubs.length > 0 ? (
        <ul>
          {clubs.map((club) => (
            <li key={club.id}>
              {club.name} - {club.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>You are not part of any clubs yet.</p>
      )}
    </div>
  );
};

export default Clubs;
