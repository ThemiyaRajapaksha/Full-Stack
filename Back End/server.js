const mongoose = require('mongoose');

const mongoDBUri = 'mongodb+srv://user:user@cluster0.6sr4x.mongodb.net/myDatabaseName?retryWrites=true&w=majority';

mongoose.connect(mongoDBUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));
