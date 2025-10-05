import mongoose from "mongoose";

const ApiKeySchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, required: true },
  key: { type: String, required: true, unique: true },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.ApiKey || mongoose.model("ApiKey", ApiKeySchema);

