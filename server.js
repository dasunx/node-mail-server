const express = require('express');
const cors = require('cors');
require('dotenv').config();

const invitationRoutes = require('./routes/invitation-routes');

const app = express();
//cors to handle origin headers
app.use(cors());

//native function for bodyparser
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Im up and running!'));
app.use('/api/invitation', invitationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
