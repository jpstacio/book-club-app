import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import AddFriendForm from '../AddFriendForm'; // Ensure this path is correct
import './Profile.css'; // Import your CSS file for styling

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [favoriteBooks, setFavoriteBooks] = useState('');
  const [biography, setBiography] = useState('');
  const [friends, setFriends] = useState([]);
  const [bookClubs, setBookClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get('/auth/profile');
      const user = response.data.user || {}; // Ensure user data exists
      setUserData(user);
      setFavoriteBooks(user.favoriteBooks || '');
      setBiography(user.biography || '');
      setFriends(user.friends || []); // Ensure this correctly maps to your backend
      setBookClubs(user.joinedBookClubs || []);
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

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put('/auth/profile', {
        favoriteBooks,
        biography,
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Error updating profile. Please try again later.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <p>Username: {userData.username}</p>
      <form onSubmit={handleSave}>
        <div>
          <label>Biography:</label>
          <textarea
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            placeholder="Tell us about yourself"
          />
        </div>
        <div>
          <label>Favorite Books:</label>
          <textarea
            value={favoriteBooks}
            onChange={(e) => setFavoriteBooks(e.target.value)}
            placeholder="Enter your favorite books (comma separated)"
          />
        </div>
        <button type="submit">Save</button>
      </form>
  
      <h3>Friends</h3>
      <AddFriendForm />
      <ul>
        {Array.isArray(friends) && friends.length > 0 ? (
          friends.map((friend) => <li key={friend.id}>{friend.username}</li>)
        ) : (
          <p>No friends added yet.</p>
        )}
      </ul>
  
      <h3>Pending Friend Requests</h3>
      <ul>
        {/* Pending requests would go here */}
      </ul>
  
      <h3>Book Clubs Joined</h3>
      <ul>
        {Array.isArray(bookClubs) && bookClubs.length > 0 ? (
          bookClubs.map((club) => <li key={club.id}>{club.name}</li>)
        ) : (
          <p>No book clubs joined yet.</p>
        )}
      </ul>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );  
};

export default Profile;
