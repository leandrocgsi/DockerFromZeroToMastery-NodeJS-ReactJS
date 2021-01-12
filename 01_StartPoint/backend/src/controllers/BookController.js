
const connection = require('../database/connection');

module.exports = {

    async index (request, response) {
        const {page = 1} = request.query;

        const [count] = await connection('book').count();

        const books = await connection('book')
            .limit(2)
            .offset((page - 1) * 2)
            .select('*');

        const total = count['count(*)'];

        const data = {
            total,
            books
        }
        
        return response.json(data);
    },

    async findById(request, response) {
        const id = request.params.id;   
        const book = await connection('book').where('id', id).first();
        return response.json(book);
    },

    async create(request, response) {
        const {title, author, price, launchDate} = request.body;

        const id = await connection('book').insert({
                author,
                title,
                launchDate,
                price,
            }).then(row => {return row[0]});;   
        
        const book = await connection('book').where('id', id).first();
    
        return response.json(book);
    },

    async update (request, response) {
        const {id, title, author, price, launchDate} = request.body;
    
        await connection('book')    
            .where('id', id)
            .update({
                author,
                title,
                launchDate,
                price,
            });
        
        const book = await connection('book').where('id', id).first();
    
        return response.json(book);
    },

    async delete (request, response) {
        const id = request.params.id;
        await connection('book')    
            .where('id', id)
            .delete();
        return response.status(204).send();
    }
};