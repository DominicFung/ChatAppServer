
const Student = require("./pg_tables").Student();
const School = require("./pg_tables").School();

Student.sync({force: true}).then(() => {
    return Student.create({
        student_email: 'fung_dominic@hotmail.com',
        first_name: 'Dominic',
        last_name: 'Fung',
        password: '123a',
        school_id_fk: 5
    });
});

// HARD REFRESH
// School.sync({force: true}).then(() => {
//     return School.create({
//         school_name: 'University of Toronto Mississauga'
//     });
// });

// School.create({
//     school_name: 'University of Waterloo'
// }).then( waterloo => {
//     console.log(waterloo.get({
//         plain: true
//     }));
// });

// School.create({
//     school_name: 'University of Toronto'
// }).then( toronto => {
//     console.log(toronto.get({
//         plain: true
//     }));
// });