import bcrypt from 'bcrypt'

const usuarios = [
    {
        nombre: "Andrea Rosales",
        usuario: "andrea1234",
        email: "andrea@gmail.com",
        password: bcrypt.hashSync('password',10),  
    },
    {
        nombre: "Daniel Ponce",
        usuario: "daniel1234",
        email: "daniel@gmail.com",
        password: bcrypt.hashSync('password',10),  
    },
    {
        nombre: "Pedro Martinez",
        usuario: "pedro1234",
        email: "pedro@gmail.com",
        password: bcrypt.hashSync('password',10),  
    },
    {
        nombre: "Laura Chavez",
        usuario: "laura1234",
        email: "laura@gmail.com",
        password: bcrypt.hashSync('password',10),  
    },
    {
        nombre: "Fernanda Rodriguez",
        usuario: "fernanda1234",
        email: "fernanda@gmail.com",
        password: bcrypt.hashSync('password',10),  
    },
];

export default usuarios;