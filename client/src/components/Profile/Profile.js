import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [bookClubs, setBookClubs] = useState([]);
  const [newClubName, setNewClubName] = useState('');
  const [newClubDescription, setNewClubDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get('/auth/profile');
      setUserData(response.data.user);
      setBookClubs(response.data.bookClubs || []); // Ensure bookClubs is set to an empty array if not present
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Error loading profile data. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleCreateClub = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/book-clubs', {
        name: newClubName,
        description: newClubDescription,
      });
      setBookClubs((prevClubs) => [...prevClubs, response.data]);
      setNewClubName('');
      setNewClubDescription('');
    } catch (error) {
      console.error('Error creating book club:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {userData.username}</p>
      <h3>Book Clubs</h3>
      {bookClubs.length > 0 ? (
        <ul>
          {bookClubs.map((club) => (
            <li key={club.id}>{club.name}</li>
          ))}
        </ul>
      ) : (
        <p>No book clubs joined yet.</p>
      )}

      <h3>Create a New Book Club</h3>
      <form onSubmit={handleCreateClub}>
        <input
          type="text"
          placeholder="Book Club Name"
          value={newClubName}
          onChange={(e) => setNewClubName(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Book Club Description"
          value={newClubDescription}
          onChange={(e) => setNewClubDescription(e.target.value)}
          required
        />
        <br />
        <button type="submit">Create Book Club</button>
      </form>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
