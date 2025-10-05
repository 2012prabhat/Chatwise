import mongoose from "mongoose";

const KnowledgeBaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  question: String,
  answer: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.KnowledgeBase ||
  mongoose.model("KnowledgeBase", KnowledgeBaseSchema);
