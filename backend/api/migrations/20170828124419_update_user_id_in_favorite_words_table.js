
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('favoriteWords', (table)=> {
    table.string('userId', 35).notNullable().alter();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('favoriteWords', (table)=> {
    table.int('userId').notNullable().alter();
  })
};
