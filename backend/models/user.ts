import mongoose from 'mongoose'
//good for seed
//data
export interface Iuser {
  email: string
  password: string
  role: 'user' | 'admin'
}
//adds _id and other methods , good for DB but not for seed
//DB object doc

export interface IuserDocument extends Iuser, mongoose.Document {}

const userSchema = new mongoose.Schema<IuserDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
})

export const User = mongoose.model<IuserDocument>('User', userSchema)
