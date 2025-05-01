import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { githubService } from '../services/api';

interface Repository {
  name: string;
  fullName: string;
  description: string | null;
  url: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleGitHubConnect = async () => {
    if (!clientId.trim() || !clientSecret.trim()) {
      setError('Please fill in both Client ID and Client Secret, read README for more information');
      return;
    }

    try {
      await githubService.connect(clientId, clientSecret);
    } catch (err) {
      setError('Failed to connect to GitHub. Please try again.');
    }
  };

  const fetchRepositories = async () => {
    setError('');
    try {
      const data = await githubService.getRepositories();
      setRepositories(data.repositories);
    } catch (err) {
      setError('Failed to fetch repositories. Connect to GitHub first.');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user.username}!</h1>
      {error && <p>{error}</p>}
      <div>
        <label htmlFor="clientId">GitHub Client ID:</label>
        <input
          type="text"
          placeholder="GitHub Client ID"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
        />
        <label htmlFor="clientSecret">GitHub Client Secret:</label>
        <input
          type="password"
          placeholder="GitHub Client Secret"
          value={clientSecret}
          onChange={(e) => setClientSecret(e.target.value)}
        />
        <button onClick={handleGitHubConnect}>Connect to GitHub account</button>
        <button onClick={fetchRepositories}>Fetch Repositories</button>
      </div>
      {repositories.length > 0 && (
        <div className="repositories">
          <h2>Your Repositories</h2>
          <ul>
            {repositories.map((repo) => (
              <li key={repo.fullName}>
                <a href={repo.url} target="_blank" rel="noopener noreferrer">
                  {repo.name}
                </a>
                {repo.description && <p>{repo.description}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
} 