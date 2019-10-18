const express = require('express');

const server = express.Router();
const db = require('./patient-model');
const errHelper = require('../../errors/errHelper');

// Things todo Doctor Route :
// [x] Add a new appointment to a doctor's calendar
// [] New appointments can only start at 15 minute intervals (ie, 8:15AM is a valid time but 8:20AM is not)
// [] A doctor can have multiple appointments with the same time, but no more than 3
// appointments can be added with the same time for a given doctorr
// [x] Delete an existing appointment from a doctor's calendar

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
// [] New appointments can only start at 15 minute intervals (ie, 8:15AM is a valid time but 8:20AM is not)
// [] A doctor can have multiple appointments with the same time, but no more than 3
// appointments can be added with the same time for a given doctor
// @Access   Public
//-----------------------------------------------------------
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
  try {
    const posted = await db.add('patient', {
      firstName: item.firstName,
      lastName: item.lastName,
      kind: item.kind,
      time: item.time,
      doctor_id: doctorId,
    });
    res.status(201).json(posted);
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
