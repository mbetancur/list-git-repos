import { Router } from 'express';
import { signup, login } from '../services/auth';

const router = Router();

router.post('/signup', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const result = signup(username, password);
  
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }

  res.json({ success: true });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const result = login(username, password);
  
  if (!result.success) {
    return res.status(401).json({ error: result.error });
  }

  res.json({ success: true });
});

export default router; 