import 'dotenv/config';
import { connectDatabase, disconnectDatabase } from './database.js';
import Measurement from '../modules/telemetry/measurement.model.js';
import AnomalyEvent from '../modules/telemetry/anomalyEvent.model.js';

async function runTest() {
  try {
    await connectDatabase();

    const sampleMeasurement = await Measurement.create({
      deviceId: 'bomba-01',
      runId: 'run-test-db-001',
      timestamp: new Date(),
      readings: { current: 1.45, vibration: 0.32, temperature: 34.5 },
      units: { current: 'A', vibration: 'g', temperature: 'C' },
      source: 'simulator',
      analysis: {
        algorithm: 'threshold',
        config: { maxCurrent: 2.5, maxVibration: 1.0, maxTemp: 55 },
        isAnomaly: false,
        score: 0,
        label: 'normal',
      },
    });

    const sampleAnomaly = await AnomalyEvent.create({
      deviceId: 'bomba-01',
      runId: 'run-test-db-001',
      timestamp: new Date(),
      measurementId: sampleMeasurement._id,
      readings: { current: 3.1, vibration: 1.4, temperature: 38.2 },
      units: { current: 'A', vibration: 'g', temperature: 'C' },
      algorithm: 'threshold',
      algorithmConfig: { maxCurrent: 2.5, maxVibration: 1.0, maxTemp: 55 },
      result: {
        severity: 'critical',
        score: 1,
        affectedVariables: ['current', 'vibration'],
        reason: 'Corriente y vibración superaron el umbral máximo configurado',
      },
      experimentalLabel: 'induced_anomaly',
    });

    console.log('📦 Medición guardada:', sampleMeasurement._id);
    console.log('🚨 Evento anómalo guardado:', sampleAnomaly._id);

    await Measurement.deleteOne({ _id: sampleMeasurement._id });
    await AnomalyEvent.deleteOne({ _id: sampleAnomaly._id });
    console.log('🧹 Registros de prueba eliminados correctamente');
  } catch (error) {
    console.error('❌ Falló la prueba de BD:', error.message);
  } finally {
    await disconnectDatabase();
  }
}

runTest();