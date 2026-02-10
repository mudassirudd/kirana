import mongoose from 'mongoose'
const mongoUri: string | undefined = process.env.MONGO_URI

export async function connectDB() {
  if (typeof mongoUri === 'undefined') {
    console.error('DB connection error')
    process.exit(1)
  }
  try {
    await mongoose.connect(mongoUri)
    console.log('MongoDB connected')
  } catch (error) {
    if (error instanceof Error) {
      console.error('DB connection error', error)
    }
    process.exit(1)
  }
}
