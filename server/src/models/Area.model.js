const mongoose = require('mongoose');

const areaSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    demographics: {
      population: Number,
      density: Number,
      medianIncome: Number,
    },
    metrics: {
      aqi: {
        value: Number,
        lastUpdated: Date,
      },
      crimeIndex: {
        value: Number,
        lastUpdated: Date,
      },
      weather: {
        temp: Number,
        condition: String,
        lastUpdated: Date,
      },
    },
    amenities: {
      hospitals: Number,
      schools: Number,
      parks: Number,
      transitHubs: Number,
    },
    score: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    scoreBreakdown: {
      airQuality: Number,
      safety: Number,
      amenities: Number,
      education: Number,
      transit: Number,
    },
  },
  {
    timestamps: true,
  }
);

// Add geospatial index for "near" queries
areaSchema.index({ location: '2dsphere' });

// Add text index for searching by name and city
areaSchema.index({ name: 'text', city: 'text' });

const Area = mongoose.model('Area', areaSchema);

module.exports = Area;
