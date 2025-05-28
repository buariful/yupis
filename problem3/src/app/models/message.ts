import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  trxId: number;
  status: "pending" | "rejected" | "success";
  attemptCount: number;
  nextAttemptAt: Date | null;
  createdAt: Date;
}

const MessageSchema: Schema = new Schema({
  trxId: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "rejected", "success"],
    default: "pending",
  },
  attemptCount: { type: Number, default: 0 },
  nextAttemptAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
});

export const Message = mongoose.model<IMessage>("Message", MessageSchema);
