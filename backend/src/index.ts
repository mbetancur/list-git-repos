import express from 'express';
import cors from 'cors';
import open from 'open';
import { githubCredentials, GitHubRepository } from './types/github';
import authRouter from './routes/auth';

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/auth', authRouter);

app.post('/auth/github', async (req, res) => {
  try {
    const { clientId, clientSecret } = req.body;

    if (!clientId || !clientSecret) {
      return res.status(400).json({ error: 'Client ID and Client Secret are required' });
    }

    Object.assign(githubCredentials, {
      clientId,
      clientSecret,
      accessToken: null
    });

    const callbackUrl = 'http://localhost:3000/auth/github/callback';
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo&redirect_uri=${callbackUrl}`;

    await open(githubAuthUrl);

    res.json({ message: 'Please complete the authorization in your browser' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to initiate GitHub authentication' });
  }
});

app.get('/auth/github/callback', async (req, res) => {
  try {
    const { code } = req.query;

    if (!code || !githubCredentials.clientId || !githubCredentials.clientSecret) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: githubCredentials.clientId,
        client_secret: githubCredentials.clientSecret,
        code: code,
      }),
    });

    const data = await response.json();
    const { access_token } = data;

    if (!access_token) {
      return res.status(400).json({ error: 'Failed to get access token' });
    }

    githubCredentials.accessToken = access_token;
    res.redirect('http://localhost:5173/callback');
  } catch (error) {
    res.status(500).json({ error: 'Failed to authenticate with GitHub' });
  }
});

app.get('/repositories', async (req, res) => {
  try {
    if (!githubCredentials.accessToken) {
      return res.status(401).json({ error: 'No access token available' });
    }

    const response = await fetch('https://api.github.com/user/repos', {
      headers: {
        'Authorization': `token ${githubCredentials.accessToken}`,
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch repositories' });
    }

    const repos = await response.json();

    res.json({
      success: true,
      repositories: repos.map((repo: GitHubRepository) => ({
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        url: repo.html_url,
      }))
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch repositories' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 