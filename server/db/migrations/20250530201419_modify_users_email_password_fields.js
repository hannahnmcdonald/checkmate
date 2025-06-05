exports.up = function(knex) {
  return knex.schema.alterTable('users', function(table) {
    table.renameColumn('firstName', 'first_name');
    table.renameColumn('lastName', 'last_name');
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('users', function(table) {
    table.renameColumn('first_name', 'firstName');
    table.renameColumn('last_name', 'lastName');
  });
};