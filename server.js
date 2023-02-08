const express = require('express');
const path = require('path');
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const port = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));
// // GET Route for homepage
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port} 🚀`)
);