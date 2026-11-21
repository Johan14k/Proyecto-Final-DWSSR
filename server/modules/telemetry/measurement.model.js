import mongoose from 'mongoose';

const measurementSchema = new mongoose.Schema(
  {
    deviceId: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    runId: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    timestamp: {
      type: Date,
      required: true,
      index: true,
    },
    readings: {
      type: Map,
      of: Number,
      required: true,
    },
    units: {
      type: Map,
      of: String,
      required: true,
    },
    source: {
      type: String,
      enum: ['simulator', 'replay', 'hardware'],
      default: 'simulator',
    },
    analysis: {
      algorithm: {
        type: String,
        default: 'none',
      },
      config: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
      },
      isAnomaly: {
        type: Boolean,
        default: false,
      },
      score: {
        type: Number,
        default: 0,
      },
      label: {
        type: String,
        enum: ['normal', 'warning', 'anomaly'],
        default: 'normal',
      },
    },
  },
  {
    timestamps: true,
  }
);

measurementSchema.index({ deviceId: 1, runId: 1, timestamp: -1 });

const Measurement = mongoose.model('Measurement', measurementSchema);

export default Measurement;