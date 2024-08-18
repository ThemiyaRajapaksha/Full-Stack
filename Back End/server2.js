const WebSocket = require('ws');
const mongoose = require('mongoose'); 
require('dotenv').config();

const port = 8080; 
const wss = new WebSocket.Server({ port });


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});
const Contact = mongoose.model('Contact', contactSchema);

wss.on('connection', (ws) => {
  ws.on('message', async (data) => {
    try {
      const parsedData = JSON.parse(data);
      const { name, email, message } = parsedData;

    

      const newContact = new Contact({ name, email, message });
      const savedContact = await newContact.save();

      ws.send(JSON.stringify({ message: 'Contact information saved successfully', data: savedContact }));


      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ message: 'New contact saved', data: savedContact }));
        }
      });
    } catch (error) {
      console.error('Error saving contact:', error);
      ws.send(JSON.stringify({ message: 'Error saving contact information', error: error.message }));
    }
  });
});