import {Schema, model, Document} from 'mongoose';
import bcrypt from 'bcryptjs';
export interface IUsuario extends Document {
    nombre: string;
    apellido: string;
    edad: number;
    pass: string;
    encryptPassword(pass: string): Promise<string>;
    validatePassword(pass: string): Promise<boolean>;
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

userSchema.methods.encryptPassword = async (pass: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(pass, salt);

};

userSchema.methods.validatePassword = async function(pass: string): Promise<boolean> {
    return await bcrypt.compare(pass, this.pass);

}

export default model<IUsuario>('Usuario', userSchema);