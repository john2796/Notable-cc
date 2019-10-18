const express = require('express');

const server = express.Router();
const db = require('./doctor-model');
const errHelper = require('../../errors/errHelper');

// Things todo Doctor Route :
// [x] Get a list of all doctors
// [x]  Get a list of all appointments for a particular doctor and particular day

//-----------------------------------------------------------
// @route    /api/doctors
// @desc     Get a list of all doctors
// @Access   Public
//-----------------------------------------------------------
server.get('/', async (req, res) => {
  try {
    const doctors = await db.get('doctors');
    res.json(doctors);
  } catch (err) {
    errHelper(500, err.errno || err, res);
  }
});

//-----------------------------------------------------------
// @route    /api/doctors
// @desc     get single doctor
// @Access   Public
//-----------------------------------------------------------
server.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const patients = await db.findAllBy('doctors', { id });
    res.json(patients);
  } catch (err) {
    errHelper(500, err.errno || err, res);
  }
});

//-----------------------------------------------------------
// @route    /api/doctors
// @desc     Get a list of all appointments for a particular doctor   and particular da
// @Access   Public
//-----------------------------------------------------------
server.get('/:id/appointments', async (req, res) => {
  const { id } = req.params;
  try {
    const patients = await db.findAllBy('patient', { doctor_id: id });
    res.json(patients);
  } catch (err) {
    errHelper(500, err.errno || err, res);
  }
});

//-----------------------------------------------------------
// @route    /api/doctors
// @desc     Add doctors
// @Access   Public
//-----------------------------------------------------------
server.post('/', async (req, res) => {
  const item = req.body;
  if (!item.firstName) {
    return res.status(400).json({ message: 'firstName field is required' });
  }
  if (!item.lastName) {
    return res.status(400).json({ message: 'lastName field is required' });
  }
  try {
    const posted = await db.add('doctors', {
      firstName: item.firstName,
      lastName: item.lastName,
    });

    res.status(201).json(posted);
  } catch (err) {
    errHelper(500, err.errno || err, res);
  }
});

//-----------------------------------------------------------
// @route    /api/doctors
// @desc    Remove doctors
// @Access   Public
//-----------------------------------------------------------
server.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const exists = await db.findBy('doctors', { id });
    if (exists) {
      const removed = await db.remove('doctors', id);
      res.json(removed);
    } else {
      return res.status(404).json({ message: 'doctors with that id does not exists' });
    }
  } catch (err) {
    errHelper(500, err.errno || err, res);
  }
});

//-----------------------------------------------------------
// @route    /api/doctors
// @desc    Update doctors Item
// @Access   Public
//-----------------------------------------------------------
server.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const exists = await db.findBy('doctors', { id });
    if (exists) {
      const updated = await db.update('doctors', id, req.body);
      res.json(updated);
    } else {
      return res.status(404).json({ message: 'doctor with that id does not exists' });
    }
  } catch (err) {
    errHelper(500, err.errno || err, res);
  }
});

module.exports = server;
