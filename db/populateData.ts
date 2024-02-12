const mongoose = require('mongoose');
const Launch = require('./launchesModel');
const Planet = require('./planetsModel');
const launchesData = require('./seed-data/launches-seed-data.json');
const planetsData = require('./seed-data/planets-seed-data.json');

require('dotenv').config();

const mongoURI = process.env.MONGO_URL;

// Connect to MongoDB
mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Connected to MongoDB');

        // Populate launches collection
        await Launch.insertMany(launchesData);
        console.log('Launches data populated successfully');

        // Populate planets collection
        await Planet.insertMany(planetsData);
        console.log('Planets data populated successfully');

        // Close the connection after populating collections
        mongoose.connection.close();
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
