import {Schema, model, Document} from 'mongoose';
export interface IUsuario extends Document {
    nombre: string,
    apellido: string,
    edad: number,
    pass: string
}

 const userSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        min:4,
        lowercase: true
    },
    apellido: {
        type: String,
        required: true,
        min:4,
        lowercase: true
        //unique: true
    },
    edad: {
        type: Number,
        required: false
    },
    pass: {
        type: String,
        required: true
    }
});

export default model<IUsuario>('Usuario', userSchema);