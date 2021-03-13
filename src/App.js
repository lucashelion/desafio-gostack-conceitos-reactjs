import React, { useEffect, useState } from "react";
import api from 'services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: "Repositorio " + Date.now(),
      url: 'https://lucashelion.com.br',
      techs: ['NodeJS', 'ReactJS']
    });

    const repositorie = response.data;
    setRepositories([... repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete('/repositories/' + id);

    if(response.status !== 204) return;

    const repoUpdated = repositories.filter(repo => repo.id !== id);
    setRepositories(repoUpdated);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie => 
          <li key={repositorie.id}>{repositorie.title}
            <button onClick={() => handleRemoveRepository(repositorie.id)}>Remover</button>
          </li>)}
      </ul>
      <br></br>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
