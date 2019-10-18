exports.seed = knex => knex('doctors')
  .del()
  .then(() => knex('doctors').insert([
    { firstName: 'Julius', lastName: 'Hibbert' },
    { firstName: 'Krieger', lastName: 'Algemap' },
    { firstName: 'Rivera', lastName: 'Nick' },
  ]));
