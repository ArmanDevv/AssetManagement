const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require('bcrypt');
const AssetModel = require("./models/assets")
const UserModel = require("./models/Users")
const session = require('express-session');

const app = express();
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(session({
  secret: 'sjhdbfuhsbjdbhjsdf',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'lax',
  }
}));

mongoose.connect("mongodb://localhost:27017/jaws");

app.post('/Dashboard/assets',(req,res)=>{
    AssetModel.create(req.body).then(assets => res.json(assets)).catch(err => res.json(err))
})

app.post('/RegistrationForm', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    console.log("Registering user:", { firstName, lastName, email });

    // Password hashing will be handled by the UserSchema pre-save hook
    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      password
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// app.get('/recent-users', async (req, res) => {
//   try {
//     const recentUsers = await UserModel.find()
//       .sort({ _id: -1 }) // Sort by _id in descending order (latest first)
//       .limit(5); // Limit to 5 results

//     res.json(recentUsers);
//   } catch (err) {
//     console.error('Error fetching recent users:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// Login endpoint with debug logs
app.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log("Login attempt:", { email, password });

    const user = await UserModel.findOne({ email });

    if (!user) {
      console.log("User not found for email:", email);
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    console.log("Stored hashed password:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      console.log("Password mismatch for user:", email);
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    req.session.userId = user._id;
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: 'Server error' });
  }
});


app.get('/profile', async (req, res) => {
  const userId = req.session.userId;
  if (userId) {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

app.get('/Dashboard', async (req, res) => {

  const userId = req.session.userId;
  if (userId) {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}
);

app.get('/Dashboard/assetDetails',(req,res)=>{
  AssetModel.find().then(users=>res.json(users)).catch(err=>res.json(err))
})

app.post('/ChangePassword', async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to log out' });
    }
    res.clearCookie('connect.sid');
    return res.status(200).json({ message: 'Logout successful' });
  });
});

app.listen(3001,()=>{
  console.log("server is running")
})
