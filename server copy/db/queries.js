const knex = require('./knex')

module.exports = {
    getAll() {
        return knex('teacher')
    },
    getOne(id) {
        return knex('teacher').where('id', id).first()
    },
    create(teacher) {
        return knex('teacher').insert(teacher, '*')
    },
    update(id, teacher) {
        return knex('teacher').where('id', id).update(teacher, '*')
    },
    delete(id) {
        return knex('teacher').where('id', id).del()
    }
}

