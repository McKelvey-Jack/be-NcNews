exports.up = function (knex) {
  console.log('creating users table...');

  return knex.schema.createTable('users', (userTable) => {
    userTable.text('username').unique().primary().notNullable();
    userTable.text('avatar_url');
    userTable.text('name').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
