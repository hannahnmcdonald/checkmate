exports.up = function(knex) {
    return knex.schema.alterTable('users', function(table) {
      table.string('firstName');
      table.string('lastName');
      table.string('email').unique();
      table.string('username').unique();
      table.string('password');
      table.specificType('friends', 'uuid[]').defaultTo('{}');
      table.specificType('games', 'uuid[]').defaultTo('{}');
      table.string('avatar');
      table.jsonb('wins').defaultTo('{}');
      table.jsonb('losses').defaultTo('{}');
      table.jsonb('tie').defaultTo('{}');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.alterTable('users', function(table) {
      table.dropColumn('firstName');
      table.dropColumn('lastName');
      table.dropColumn('email');
      table.dropColumn('username');
      table.dropColumn('password');
      table.dropColumn('friends');
      table.dropColumn('games');
      table.dropColumn('avatar');
      table.dropColumn('wins');
      table.dropColumn('losses');
      table.dropColumn('tie');
    });
  };
  