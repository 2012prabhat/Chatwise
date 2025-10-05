import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  company: { type: String, required: true }, // 👈 added field
}, { timestamps: true });


// Avoid model overwrite issue in Next.js
export default mongoose.models.User || mongoose.model("User", UserSchema);
