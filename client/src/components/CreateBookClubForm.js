import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const CreateBookClubForm = () => {
  const [clubName, setClubName] = useState('');
  const [clubDescription, setClubDescription] = useState('');
  const [currentBook, setCurrentBook] = useState('');
  const [currentChapters, setCurrentChapters] = useState('');
  const [bookDescription, setBookDescription] = useState('');

  const handleCreateClub = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/book-clubs', {
        name: clubName,
        description: clubDescription,
        currentBook,
        currentChapters,
        bookDescription,
      });
      alert('Book club created successfully!');
      setClubName('');
      setClubDescription('');
      setCurrentBook('');
      setCurrentChapters('');
      setBookDescription('');
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
      <input
        type="text"
        placeholder="Current Book"
        value={currentBook}
        onChange={(e) => setCurrentBook(e.target.value)}
      />
      <input
        type="text"
        placeholder="Chapters to Read This Week"
        value={currentChapters}
        onChange={(e) => setCurrentChapters(e.target.value)}
      />
      <textarea
        placeholder="Book Description"
        value={bookDescription}
        onChange={(e) => setBookDescription(e.target.value)}
      />
      <button type="submit">Create Book Club</button>
    </form>
  );
};

export default CreateBookClubForm;
