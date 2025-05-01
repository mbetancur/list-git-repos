import { useNavigate } from 'react-router-dom';

export default function GitHubCallback() {
  const navigate = useNavigate();

  return (
    <>
      <h2>GitHub Connection Complete</h2>
      <p>Your GitHub account has been successfully connected.</p>
      <button onClick={() => navigate('/dashboard')}>
        Go to Dashboard
      </button>
    </>
  );
} 