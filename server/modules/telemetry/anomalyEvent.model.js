import mongoose from 'mongoose';

const anomalyEventSchema = new mongoose.Schema(
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
    measurementId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Measurement',
      required: false,
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
    algorithm: {
      type: String,
      required: true,
    },
    algorithmConfig: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    result: {
      severity: {
        type: String,
        enum: ['warning', 'critical'],
        default: 'critical',
      },
      score: {
        type: Number,
        required: true,
      },
      affectedVariables: {
        type: [String],
        default: [],
      },
      reason: {
        type: String,
        required: true,
      },
    },
    experimentalLabel: {
      type: String,
      enum: ['unlabeled', 'normal', 'induced_anomaly', 'real_fault'],
      default: 'unlabeled',
    },
  },
  {
    timestamps: true,
  }
);

anomalyEventSchema.index({ deviceId: 1, runId: 1, timestamp: -1 });

const AnomalyEvent = mongoose.model('AnomalyEvent', anomalyEventSchema);

export default AnomalyEvent;