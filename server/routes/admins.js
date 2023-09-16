import express from 'express';
import bcrypt from 'bcrypt';
import Admin from '../models/admin.js'; // Import the Admin model

const router = express.Router();

// Create a new admin
router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({ username, password: hashedPassword });
    await admin.save();

    res.status(201).json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Retrieve an admin's information with username and password
router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find the admin by username
      const admin = await Admin.findOne({ username });
  
      if (!admin) {
        return res.status(401).json({ error: 'Authentication failed' });
      }
  
      // Check if the provided password matches the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, admin.password);
  
      if (passwordMatch) {
        res.json(admin); // Successfully logged in
      } else {
        res.status(401).json({ error: 'Authentication failed' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Get a list of all admins
router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific admin by ID
router.get('/:id', async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a specific admin by ID
router.put('/:id', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the admin exists
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Update admin properties
    admin.username = username;
    admin.password = await bcrypt.hash(password, 10); // Hash the new password
    await admin.save();

    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a specific admin by ID
router.delete('/:id', async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.json({ message: 'Admin deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
