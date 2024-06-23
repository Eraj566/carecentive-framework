exports.up = function (knex) {
    return knex.schema.createTable('tickets', function (table) {
      table.increments('id').primary();
      table.string('title', 255).notNullable();
      table.text('description');
      table.enum('status', ['open', 'closed', 'in-progress']).defaultTo('open');
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.integer('userId').unsigned().notNullable();
      table.foreign('userId').references('users.id');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('tickets');
  };
  