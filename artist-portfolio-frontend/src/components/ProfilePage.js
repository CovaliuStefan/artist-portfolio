import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
  const [works, setWorks] = useState([]);
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  useEffect(() => {
    if (username) {
      axios.get(`http://localhost:5000/api/portfolio?username=${username}`)
        .then(response => setWorks(response.data))
        .catch(error => console.error('Error fetching user works:', error));
    }
  }, [username]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/portfolio/${id}`, { data: { username } })
      .then(() => setWorks(works.filter(work => work.id !== id)))
      .catch(error => console.error('Error deleting work:', error));
  };

  return (
    <div>
      <h1>Your Portfolio</h1>
      {works.length ? (
        <ul className='profile-grid'>
          {works.map(work => (
            <li key={work.id} >
              <h2>{work.title}</h2>
              <p>{work.description}</p>
              {work.image && <img src={`http://localhost:5000${work.image}`} alt={work.title} className={work.visibility === 'hidden' ? 'hidden' : ''}/>}
              <a href={work.clientLink} target="_blank" rel="noopener noreferrer">Visit page</a>
              <button onClick={() => navigate(`/add/${work.id}`)}>Edit</button>
              <button onClick={() => handleDelete(work.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <div className='no-works'>
          <p>No works found.</p>
          <p>Please upload your work to get started.</p>
          <button onClick={() => navigate('/add')} className='add-work-button'>Add Work</button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
