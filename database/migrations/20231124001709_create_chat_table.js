exports.up = function (knex) {
    return knex.schema.createTable('chat', function (table) {
      table.increments('id').primary();
      table.text('message');
      table.string('attachment');
      table.integer('user_id').unsigned().notNullable();
      table.integer('ticket_id').unsigned();
      table.integer('group_id').unsigned();
  
      table.timestamp('created_at').defaultTo(knex.fn.now());
      
      // Foreign key constraints
      table.foreign('user_id').references('users.id');
      table.foreign('ticket_id').references('tickets.id');
      table.foreign('group_id').references('groups.id');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('chat');
  };
  