import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import CreateBookClubForm from '../CreateBookClubForm';
import BookClubList from '../BookClubList';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get('/auth/profile');
      setUserData(response.data.user);
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
    window.location.href = '/login';
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {userData.username}</p>
      <CreateBookClubForm />
      <BookClubList />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
