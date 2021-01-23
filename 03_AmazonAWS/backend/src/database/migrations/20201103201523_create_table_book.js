exports.up = function(knex) {
    return knex.schema.createTable('book', table => {
        table.increments('id')
        table.string('author').notNullable()
        table.string('title').notNullable()
        table.datetime('launchDate', { precision: 6 }).defaultTo(knex.fn.now(6))
        table.decimal('price', 8, 2).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('book');
};