import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String,   // ✅ store raw HTML here!
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  featuredImage: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

export const Post = mongoose.model('Post', PostSchema)



















