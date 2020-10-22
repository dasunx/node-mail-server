const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
require('dotenv').config();

const app = express();
//cors to handle origin headers
app.use(cors());

//native function for bodyparser
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Im up and running!'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
