const mongoose = require('mongoose');

const connectDataBase = ()=>{
    mongoose.connect(process.env.DB_URL).then((con)=>{
        console.log("Connected MongoDB", con.connection.host)
    })
}

module.exports= connectDataBase;