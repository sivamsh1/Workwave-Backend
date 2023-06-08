import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://sivamsanck:9KsW1IAiO9qh1WEq@cluster1.zlzoayf.mongodb.net/workWave")
    console.log(`Database connected successfully`)
  } catch (error) {
    console.log(error)

}
}




export default connectDB;

