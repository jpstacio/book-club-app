import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const CreateBookClubForm = () => {
  const [clubName, setClubName] = useState('');
  const [clubDescription, setClubDescription] = useState('');

  const handleCreateClub = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/book-clubs', {
        name: clubName,
        description: clubDescription,
      });
      alert('Book club created successfully!');
      setClubName('');
      setClubDescription('');
    } catch (err) {
      console.error('Error creating book club:', err);
    }
  };

  return (
    <form onSubmit={handleCreateClub}>
      <input
        type="text"
        placeholder="Book Club Name"
        value={clubName}
        onChange={(e) => setClubName(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={clubDescription}
        onChange={(e) => setClubDescription(e.target.value)}
      />
      <button type="submit">Create Book Club</button>
    </form>
  );
};

export default CreateBookClubForm;
