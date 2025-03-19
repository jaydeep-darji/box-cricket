// Example with Node.js + Express + MongoDB
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/boxCricketDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define schemas
const SlotSchema = new mongoose.Schema({
  day: Number,
  time: Number,
  date: Date,
  status: String,
  venue: String,
  team: String,
  opponents: String,
  bookingTime: Date
});

const Slot = mongoose.model('Slot', SlotSchema);

// API routes to get and update slots
app.use(express.json());

app.get('/api/slots', async (req, res) => {
  try {
    const slots = await Slot.find(req.query);
    res.json(slots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/slots/book', async (req, res) => {
  try {
    const { day, timeSlot, venue, team, opponents } = req.body;
    
    // Update slot in database
    const result = await Slot.findOneAndUpdate(
      { day, time: timeSlot, venue, status: 'available' },
      { status: 'booked', team, opponents, bookingTime: new Date() },
      { new: true }
    );
    
    if (!result) {
      return res.status(400).json({ error: 'Slot is not available' });
    }
    
    // Broadcast the update to all connected clients
    io.emit('slot-update', result);
    
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// WebSocket connection for real-time updates
io.on('connection', (socket) => {
  console.log('Client connected');
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});