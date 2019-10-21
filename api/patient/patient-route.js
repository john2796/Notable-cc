const express = require('express');
const db = require('./patient-model');
const errHelper = require('../../errors/errHelper');

const server = express.Router();
//-----------------------------------------------------------
// @route    /api/patient
// @desc     Get a list of all patient
// @Access   Public
//-----------------------------------------------------------
server.get('/', async (req, res) => {
  try {
    const patient = await db.get('patient');
    res.json(patient);
  } catch (err) {
    errHelper(500, err.errno || err, res);
  }
});

//-----------------------------------------------------------
// @route    /api/patient
// @desc     Add a new appointment to a doctor's calendar
// @Access   Public
//-----------------------------------------------------------
function checkIfValidTime(time) {
  let minute = time.split(':');
  minute = minute[1].split(' ')[0];
  return minute % 15 === 0;
}

function currentDate() {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  today = `${mm}/${dd}/${yyyy}`;
  return today;
}


server.post('/:doctorId', async (req, res) => {
  const item = req.body;
  const { doctorId } = req.params;
  if (!item.firstName) {
    return res.status(400).json({ message: 'firstName field is required' });
  }
  if (!item.lastName) {
    return res.status(400).json({ message: 'lastName field is required' });
  }
  if (!item.kind) {
    return res.status(400).json({ message: 'Kind field is required' });
  }
  if (!item.time) {
    return res.status(400).json({ message: 'Time field is required' });
  }
  try {
    // [x] New appointments can only start at 15 minute intervals
    // (ie, 8:15AM is a valid time but 8:20AM is not)
    const isValidTime = checkIfValidTime(item.time);
    if (isValidTime) {
      // [x] A doctor can have multiple appointments with the same time, but no more than 3
      // appointments can be added with the same time for a given doctor
      //  - get patient speficic time
      //  - Query database for all the patient that has the same time
      const patients = await db.findAllBy('patient', { doctor_id: doctorId });
      const { time } = item;
      const sameTimeFrame = patients.filter(patient => patient.time === time);

      if (sameTimeFrame.length <= 3) {
        const posted = await db.add('patient', {
          firstName: item.firstName,
          lastName: item.lastName,
          kind: item.kind,
          time: item.time,
          doctor_id: doctorId,
          date: currentDate(),
        });
        res.status(201).json(posted);
      } else {
        res.status(400).json({ message: 'Doctor can not have more than 3 appointments' });
      }
    } else {
      res.status(400).json({ message: 'Invalid Time Frame' });
    }
  } catch (err) {
    errHelper(500, err.errno || err, res);
  }
});

//-----------------------------------------------------------
// @route    /api/patient
// @desc    Delete an existing appointment from a doctor's calendar
// @Access   Public
//-----------------------------------------------------------
server.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const exists = await db.findBy('patient', { id });
    if (exists) {
      const removed = await db.remove('patient', id);
      res.json(removed);
    } else {
      return res.status(404).json({ message: 'patient with that id does not exists' });
    }
  } catch (err) {
    errHelper(500, err.errno || err, res);
  }
});

//-----------------------------------------------------------
// @route    /api/patient
// @desc    Update patient Item
// @Access   Public
//-----------------------------------------------------------
server.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const exists = await db.findBy('patient', { id });
    if (exists) {
      const updated = await db.update('patient', id, req.body);
      res.json(updated);
    } else {
      return res.status(404).json({ message: 'doctor with that id does not exists' });
    }
  } catch (err) {
    errHelper(500, err.errno || err, res);
  }
});

module.exports = server;
