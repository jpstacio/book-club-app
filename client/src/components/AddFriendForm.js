import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const AddFriendForm = () => {
  const [username, setUsername] = useState(''); // State to hold the username input
  const [message, setMessage] = useState(''); // State to hold success/error messages

  // Function to handle adding a friend
  const handleAddFriend = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    console.log('Attempting to add friend with username:', username);
    console.log('Request URL will be:', axiosInstance.defaults.baseURL + '/friends/add');

    try {
      // Send a POST request to add a friend by username
      await axiosInstance.post('/friends/add', { username });
      setMessage('Friend request sent!'); // Update message on success
      setUsername(''); // Clear the input field after submission
    } catch (error) {
      console.error('Error adding friend:', error);
      setMessage('Failed to send friend request.'); // Update message on error
    }
  };

  return (
    <div>
      <form onSubmit={handleAddFriend}> {/* Attach the handleAddFriend function to the form submission */}
        <input
          type="text"
          value={username} // Bind the input value to the username state
          onChange={(e) => setUsername(e.target.value)} // Update username state on input change
          placeholder="Enter username"
          required // Mark the input as required
        />
        <button type="submit">Add Friend</button> {/* Submit button */}
      </form>
      {message && <p>{message}</p>} {/* Display success/error message */}
    </div>
  );
};

export default AddFriendForm;
