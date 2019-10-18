exports.seed = knex => knex('patient')
  .del()
  .then(() => knex('patient').insert([
    {
      firstName: 'Mikko',
      lastName: 'Miranda',
      kind: 'New Patient',
      time: '8:00AM',
      doctor_id: 1,
    },
    {
      firstName: 'Shaun',
      lastName: 'Kolich',
      kind: 'Follow-up',
      time: '8:30AM',
      doctor_id: 1,
    },
    {
      firstName: 'Chris',
      lastName: 'Gillete',
      kind: 'Follow-up',
      time: '9:00AM',
      doctor_id: 1,
    },
    {
      firstName: 'Ray',
      lastName: 'Kane',
      kind: 'New Patient',
      doctor_id: 1,
      time: '9:30AM',
    },
    {
      firstName: 'Pam',
      lastName: 'Poove',
      kind: 'New Patient',
      doctor_id: 1,
      time: '9:30AM',
    },

    {
      firstName: 'Mikko',
      lastName: 'Miranda',
      kind: 'New Patient',
      doctor_id: 2,
      time: '10:00AM',
    },
    {
      firstName: 'Shaun',
      lastName: 'Kolich',
      kind: 'Follow-up',
      doctor_id: 2,
      time: '10:00AM',
    },
    {
      firstName: 'Chris',
      lastName: 'Gillete',
      kind: 'Follow-up',
      doctor_id: 2,
      time: '10:30AM',
    },
    {
      firstName: 'Ray',
      lastName: 'Kane',
      kind: 'New Patient',
      doctor_id: 3,
      time: '11:00AM',
    },
    {
      firstName: 'Pam',
      lastName: 'Poove',
      kind: 'New Patient',
      doctor_id: 3,
      time: '11:30AM',
    },
  ]));
