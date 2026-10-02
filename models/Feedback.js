import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [3, 'Message is too short'],
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { versionKey: false }
);

export default mongoose.models.Feedback ||
  mongoose.model('Feedback', FeedbackSchema);