import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PortfolioList.css'

const PortfolioList = () => {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/portfolio')
      .then(response => setWorks(response.data))
      .catch(error => console.error('Error fetching portfolio:', error));
  }, []);

  return (
    <div>
      <h1>All Portfolios</h1>
      {works.length ? (
        <ul className='portfolio-grid'>
          {works.map(work => (
            <li key={work.id}>
              <h2>{work.title}</h2>
              <p>{work.description}</p>
              {work.image && <img src={`http://localhost:5000${work.image}`} alt={work.title} />}
              <a href={work.clientLink} target="_blank" rel="noopener noreferrer">Visit page</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No works found.</p>
      )}
    </div>
  );
};

export default PortfolioList;
