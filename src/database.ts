import mongoose from 'mongoose';

//metodo connect recibe URL de la base de datos
mongoose.connect('mongodb://localhost/test',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(db => console.log('base de datos conectada'))
.catch(err => console.log(err));