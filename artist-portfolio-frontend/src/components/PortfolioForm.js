import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './PortfolioForm.css';

const PortfolioForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [visibility, setVisibility] = useState('public');
  const [clientLink, setClientLink] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const username = localStorage.getItem('username');

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/portfolio/${id}`, { headers: { 'username': username } })
        .then(response => {
          const work = response.data;
          setTitle(work.title || '');
          setDescription(work.description || '');
          setVisibility(work.visibility || 'public');
          setClientLink(work.clientLink || '');
        })
        .catch(error => console.error('Error fetching work:', error));
    }
  }, [id, username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('visibility', visibility);
    formData.append('clientLink', clientLink);
    formData.append('username', username);

    const updatedWork = {
      title,
      description,
      image,
      visibility,
      clientLink,
      username,
    };

    console.log('Updated work:', updatedWork);

    const request = id
      ? axios.put(`http://localhost:5000/api/portfolio/${id}`, updatedWork, { headers: { 'username': username } })
      : axios.post('http://localhost:5000/api/portfolio', formData, { headers: { 'username': username } });

      console.log('Username:', username);

    request
      .then(() => navigate('/profile'))
      .catch(error => console.error('Error submitting form:', error));
  };

  return (
    <div className="form-container">
      <h1>{id ? 'Update Work' : 'Add Work'}</h1>
      <form onSubmit={handleSubmit} className="portfolio-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="form-input"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="form-textarea"
        ></textarea>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="form-file"
        />
        <input
          type="text"
          placeholder="Client Link"
          value={clientLink}
          onChange={(e) => setClientLink(e.target.value)}
          className="form-input"
        />
        <select value={visibility} onChange={(e) => setVisibility(e.target.value)} className="form-select">
          <option value="public">Public</option>
          <option value="hidden">Hidden</option>
        </select>
        <button type="submit" className="form-button">{id ? 'Update Work' : 'Add Work'}</button>
      </form>
    </div>
  );
};

export default PortfolioForm;
