import mongoose from 'mongoose';

// Define schema for planets collection
const PlanetSchema = new mongoose.Schema({
  keplerName: {
    type: String,
    required: true,
  }
});

// Create model for planets collection
const Planet = mongoose.model('Planet', PlanetSchema);

module.exports = Planet;
