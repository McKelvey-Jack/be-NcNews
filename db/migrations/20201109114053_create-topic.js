exports.up = function (knex) {
  return knex.schema.createTable('topics', (topicsTable) => {
    //console.log('creating table topics....');
    topicsTable.text('slug').unique().primary().notNullable();
    topicsTable.text('description');
  });
};

exports.down = function (knex) {
  // console.log('dropping table topics...');
  return knex.schema.dropTable('topics');
};
