import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [bookClubs, setBookClubs] = useState([]);
  const navigate = useNavigate();

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get('/profile'); // Example endpoint for fetching profile data
      setUserData(response.data.user);
      setBookClubs(response.data.bookClubs);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!userData) return <p>Loading...</p>;

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
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
