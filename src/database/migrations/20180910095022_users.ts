import * as Knex from 'knex';

export const up = async (knex: Knex) => {
  await knex.schema.createTable('users', (users) => {
    users.increments();

    users
      .string('username', 128)
      .notNullable()
      .unique();
    users.string('password', 128).notNullable();
  });
};

export const down = async (knex: Knex) => {
  await knex.schema.dropTableIfExists('users');
};
