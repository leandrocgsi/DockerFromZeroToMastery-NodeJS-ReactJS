exports.up = function(knex) {
    return knex('book').insert([
        {
          id: 1,
          author: 'Robert C. Martin',
          title: 'Clean Code',
          launchDate: '2008-08-11',
          price: 77
        },
        {
          id: 2,
          author: 'Martin Fowler, Kent Beck',
          title: 'Refactoring: Improving the Design of Existing Code',
          launchDate: '2012-03-09',
          price: 88
        },
        {
          id: 3,
          author: 'Eric Evans',
          title: 'Domain Driven Design',
          launchDate: '2016-12-16',
          price: 92
        },
        {
          id: 4,
          author: 'Michael C. Feathers',
          title: 'Working effectively with legacy code',
          launchDate: '2004-09-22',
          price: 49
        },
        {
          id: 5,
          author: 'Sean Kane, Karl Matthias',
          title: 'Docker – Up and Running: Shipping Reliable Containers in Production',
          launchDate: '2018-09-25',
          price: 240
        }
      ]);  
};

exports.down = function(knex) {
    return knex('book').del();
};
