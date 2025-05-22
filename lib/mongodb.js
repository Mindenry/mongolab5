import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    const uri = `mongodb+srv://mindpeerawit:${process.env.MONGO_PASSWORD}@cluster0.4wmxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    const options = {
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      }
    };
    
    await mongoose.connect(uri, options);
    console.log("เชื่อมต่อกับ MongoDB สำเร็จแล้ว!");
  } catch (error) {
    console.log("เกิดข้อผิดพลาดในการเชื่อมต่อกับ MongoDB:", error);
  }
};
