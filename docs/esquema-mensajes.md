# Esquema de Mensajes y Convención de Temas MQTT

Este documento define el contrato de comunicación entre el nodo de adquisición (simulador o microcontrolador) y el backend en Express a través del broker MQTT (Mosquitto).

## 1. Convención de Temas (Topics)

El parámetro `{id}` identifica de forma única al motor o bomba de agua monitoreada (por ejemplo, `bomba-01`).

| Tema | Dirección | Propósito |
| :--- | :--- | :--- |
| `motor/{id}/telemetria` | Dispositivo → Broker → Backend | Envío periódico de lecturas de sensores durante una corrida experimental. |
| `motor/{id}/estado` | Dispositivo → Broker → Backend | Reporte de conectividad (`online` / `offline`), arranque o fallo de conexión (compatible con *Last Will and Testament* de MQTT). |

---

## 2. Mensaje de Telemetría (`motor/{id}/telemetria`)

Formato **JSON** con las tres variables base propuestas (corriente, vibración y temperatura). Cuando se instrumente el hardware real, se podrán ajustar o ampliar las claves en `readings` y `units` sin romper la estructura general.

```json
{
  "deviceId": "bomba-01",
  "timestamp": "2026-11-20T23:10:00.000Z",
  "runId": "run-20261120-001",
  "readings": {
    "current": 1.42,
    "vibration": 0.35,
    "temperature": 34.8
  },
  "units": {
    "current": "A",
    "vibration": "g",
    "temperature": "C"
  },
  "meta": {
    "source": "simulator",
    "samplingHz": 1
  }
}