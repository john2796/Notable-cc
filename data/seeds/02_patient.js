function currentDate() {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = today.getFullYear();
  today = `${mm}/${dd}/${yyyy}`;
  return today;
}

exports.seed = knex => knex('patient')
  .del()
  .then(() => knex('patient').insert([
    {
      firstName: 'Mikko',
      lastName: 'Miranda',
      kind: 'New Patient',
      time: '8:00 AM',
      doctor_id: 1,
      date: currentDate(),
    },
    {
      firstName: 'Shaun',
      lastName: 'Kolich',
      kind: 'Follow-up',
      time: '8:30 AM',
      doctor_id: 1,
      date: currentDate(),
    },
    {
      firstName: 'Chris',
      lastName: 'Gillete',
      kind: 'Follow-up',
      time: '9:00 AM',
      doctor_id: 1,
      date: currentDate(),
    },
    {
      firstName: 'Ray',
      lastName: 'Kane',
      kind: 'New Patient',
      doctor_id: 1,
      date: currentDate(),
      time: '9:30 AM',
    },
    {
      firstName: 'Pam',
      lastName: 'Poove',
      kind: 'New Patient',
      doctor_id: 1,
      date: currentDate(),
      time: '9:30 AM',
    },

    {
      firstName: 'Mikko',
      lastName: 'Miranda',
      kind: 'New Patient',
      doctor_id: 2,
      date: currentDate(),
      time: '10:00 AM',
    },
    {
      firstName: 'Shaun',
      lastName: 'Kolich',
      kind: 'Follow-up',
      doctor_id: 2,
      date: currentDate(),
      time: '10:00 AM',
    },
    {
      firstName: 'Chris',
      lastName: 'Gillete',
      kind: 'Follow-up',
      doctor_id: 2,
      date: currentDate(),
      time: '10:30 AM',
    },
    {
      firstName: 'Ray',
      lastName: 'Kane',
      kind: 'New Patient',
      doctor_id: 3,
      date: currentDate(),
      time: '11:00 AM',
    },
    {
      firstName: 'Pam',
      lastName: 'Poove',
      kind: 'New Patient',
      doctor_id: 3,
      date: currentDate(),
      time: '11:30 AM',
    },
  ]));
