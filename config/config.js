const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
  path: path.resolve(process.cwd(), `${process.env.NODE_ENV.trim()}.env`)
});



// const { DB_USER, DB_PASS, DB_CLUSTER } = process.env;

// const DB_URI = `${DB_USER}:${DB_PASS}@${DB_CLUSTER}`

module.exports = {
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 8080,
  MODE: process.env.MODE || 'FORK',
  DATA_SOURCE: process.env.DATA_SOURCE || 'MEM',
  COOKIE_SECRET: process.env.COOKIE_SECRET || 'ProyectoFinal',
  DATABASE: process.env.DATABASE || 'ProyectoFinal',

  DB_URL: `mongodb+srv://Zyntax777:ipBgVqXjPHuJArB3@777-cluster.skkus.mongodb.net/${database = 'ProyectoFinal'}?retryWrites=true&w=majority`,

  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PHONE: process.env.ADMIN_PHONE,

  TWILIO_ID: process.env.TWILIO_ID,
  TWILIO_TOKEN: process.env.TWILIO_TOKEN,
  mongodb: {
    connectTo: (database) => 
    `mongodb+srv://Zyntax777:ipBgVqXjPHuJArB3@777-cluster.skkus.mongodb.net/${database}?retryWrites=true&w=majority`
  },
}

