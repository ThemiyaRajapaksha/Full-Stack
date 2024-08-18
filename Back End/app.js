
const User = require('./user');
const Admin = require('./models/Admin');
const Promotion = require('./models/promotion');
const bodyParser = require('body-parser');
const orderRoutes = require('./router'); 
const Contact = require('./models/contact'); 


require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs'); 


const app = express();


app.use(cors());
app.use(express.json());







const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');





const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};








mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));


app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }


    const user = new User({ email, password });


    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.post('/login', async (req, res) => {
  try {
      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (!existingUser) {
    
          return res.status(401).json({ message: 'Invalid email or password' });
      }

   
      const isPasswordValid = bcrypt.compareSync(password, existingUser.password);
      if (!isPasswordValid) {
         
          return res.status(401).json({ message: 'Invalid email or password' });
      }

    
      res.status(200).json({ message: 'Login successful', email: email });
  } catch (error) {
      res.status(500).send(error.message);
  }
});



app.get('/admin/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.get('/menu', async (req, res) => {
  try {
    const users = await MenuItem.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



const MenuItem = require('./models/MenuItem');
const orderSchema = require('./models/orderSchema');
const { appendFile } = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const randomNum = Math.floor(Math.random() * (999999 - 99999 + 1)) + 99999;
    cb(null, randomNum + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage, fileFilter: fileFilter });


app.use('/uploads', express.static(path.join(__dirname, '/uploads'))); 







app.post('/admin/menu/add', upload.single('image'), async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const image = req.file ? req.file.filename : null;

    const menuItem = new MenuItem({
      name: name,
      price: price,
      category: category,
      image: image,
    });

    await menuItem.save();

    res.status(201).json({ message: 'Menu item created successfully', menuItem });
  } catch (error) {
    console.log( error.message)
    res.status(500).json({ message: error.message });
  }
});





app.post('/admin/add/user', async (req, res) => {
  try {
    const { email, password } = req.body;

 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

  
    const user = new Admin({ email, password });


    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
        console.log( error.message)

    res.status(500).send(error.message);
  }
});



app.get('/admin/staff', async (req, res) => {
  try {
    const staff = await Admin.find();
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});





function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

app.put('/admin/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { email } = req.body;

  
    if (!email || !validateEmail(email)) {
      return res.status(400).send({ message: 'Invalid email' });
    }

    const user = await User.findByIdAndUpdate(userId, { email }, { new: true });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }


    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});






















app.delete('/admin/users/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await User.findByIdAndDelete(userId);
    if (!result) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send({ message: 'User deleted successfully' });
  } catch (error) {
    console.log(error.message)
    res.status(500).send({ message: 'Internal server error' });
  }
});




app.put('/admin/staff/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { email } = req.body;

   
    if (!email || !validateEmail(email)) {
      return res.status(400).send({ message: 'Invalid email' });
    }

    const admin = await Admin.findByIdAndUpdate(userId, { email }, { new: true });
    if (!admin) {
      return res.status(404).send({ message: 'User not found' });
    }


    res.status(200).json({ message: 'User updated successfully', admin });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});






app.delete('/admin/staff/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await Admin.findByIdAndDelete(userId);
    if (!result) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send({ message: 'User deleted successfully' });
  } catch (error) {
    console.log(error.message)
    res.status(500).send({ message: 'Internal server error' });
  }
});





app.put('/menu/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const { price } = req.body;

  try {

    const updatedItem = await MenuItem.findByIdAndUpdate(itemId, { price }, { new: true });
    if (!updatedItem) {
      return res.status(404).send({ message: 'Menu item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});



app.delete('/menu/:itemId', async (req, res) => {
  const { itemId } = req.params;

  try {
    const result = await MenuItem.findByIdAndDelete(itemId);
    if (!result) {
      return res.status(404).send({ message: 'Menu item not found' });
    }
    res.send({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});


app.post('/admin/add-promotion', upload.single('itemImage'), async (req, res) => {
  try {
    const { name } = req.body;
    const imageUrl = req.file ? req.file.path : '';

    const promotion = new Promotion({ name, imageUrl });
    await promotion.save();

    res.status(201).json(promotion);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message });
  }
});




app.get('/promotions', async (req, res) => {
  try {
    const promotion = await Promotion.find();
    res.status(200).json(promotion);
    console.log(promotion)


  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message });
  }
});



app.put('/promotions/:promotionId', async (req, res) => {
  const { promotionId } = req.params;
  const updateData = req.body;

  try {
    const updatedPromotion = await Promotion.findByIdAndUpdate(promotionId, updateData, { new: true });
    if (!updatedPromotion) {
      return res.status(404).json({ message: 'Promotion not found' });
    }
    res.json(updatedPromotion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.delete('/promotions/:promotionId', async (req, res) => {
  const { promotionId } = req.params;

  try {
    const promotion = await Promotion.findByIdAndDelete(promotionId);
    if (!promotion) {
      return res.status(404).json({ message: 'Promotion not found' });
    }
    res.json({ message: 'Promotion deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.get('/api/orders', async (req, res) => {
  const orders = await orderSchema.find();
  res.json(orders);
});
app.put('/api/orders/:id', async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  try {
    const updatedOrder = await orderSchema.findByIdAndUpdate(id, { email }, { new: true, runValidators: true });
    if (!updatedOrder) {
      return res.status(404).send('Order not found');
    }
    res.json(updatedOrder);
  } catch (error) {
    console.log(error.message)
    res.status(500).send(error.message);
  }
});

app.delete('/api/orders/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByIdAndRemove(id);
    if (!order) {
      return res.status(404).send('Order not found');
    }
    res.send({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.use(bodyParser.json()); 










app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;



  const newContact = new Contact({ name, email, message });

  try {

    const savedContact = await newContact.save();
    

    res.status(201).json({ message: 'Contact information saved successfully', data: savedContact });
  } catch (error) {

    console.error('Error saving contact information:', error);
    console.log(error.message)
    res.status(500).json({ message: 'Error saving contact information', error: error.message });
  }
});



app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Contact.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error: error.message });
  }
});




app.put('/api/messages/:id', async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  try {
    const message = await Contact.findByIdAndUpdate(id, { email }, { new: true });
    if (!message) {
      return res.status(404).send('Message not found.');
    }
    res.send(message);
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Server error while updating message.');
  }
});


app.delete('/api/messages/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const message = await Contact.findByIdAndDelete(id);
    if (!message) {
      return res.status(404).send('Message not found.');
    }
    res.send({ message: 'Message deleted successfully.' });
  } catch (error) {
    res.status(500).send('Server error while deleting message.');
  }
});



app.get('/api/orders', async (req, res) => {
  const email = req.query.email;

  if (!email) {
    return res.status(400).send('Email is required to fetch orders.');
  }

  try {
    const orders = await Order.find({ email: email });
    res.json(orders);
  } catch (error) {
    res.status(500).send('Server error');
  }
});






app.use(orderRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));