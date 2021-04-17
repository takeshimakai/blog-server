require('dotenv').config();
require('./config/passport');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');

const userRouter = require('./routes/user');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

const app = express();

//Set up mongoose connection
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('MongoDB connected'));

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/user', userRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

app.listen(5000, () => console.log('listening on port 5000'));