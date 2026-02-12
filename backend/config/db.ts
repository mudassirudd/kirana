import mongoose from 'mongoose'

export async function connectDB() {
  const mongoUri: string | undefined = process.env.MONGO_URI
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
