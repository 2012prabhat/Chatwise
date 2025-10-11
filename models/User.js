import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    company: { type: String, required: true },
    resetToken: { type: String, default: null }, // Add this
    resetTokenExpiry: { type: Date, default: null }, // Add this
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password,10);
  next();
});

// Avoid model overwrite issue in Next.js
export default mongoose.models.User || mongoose.model("User", UserSchema);
