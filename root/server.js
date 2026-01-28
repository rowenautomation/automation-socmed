const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve frontend files

// MongoDB Connection (replace with your MongoDB Atlas URI)
mongoose.connect('mongodb+srv://rmtiktokcontents_db_user:8ADApvqPYumSbQn6@cluster0.imqndl9.mongodb.net/?appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// API Routes
app.post('/api/signup', async (req, res) => {
  const { name, email } = req.body;
  const newUser = new User({ name, email });
  try {
    await newUser.save();
    res.status(201).json({ message: 'User signed up successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Error saving user' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
