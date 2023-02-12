require('dotenv').config();
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useCreateIndex : true,
    useFindAndModify: false

},(err) => { if(err){
    console.log(err);
}
else {
    console.log("Database Successfully Conected.")
}
})


