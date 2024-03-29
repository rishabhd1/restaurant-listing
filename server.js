const express = require('express');
const connectDB = require('./config/db');

const app = express();
connectDB();
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/restaurants', require('./routes/api/restaurants'));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
