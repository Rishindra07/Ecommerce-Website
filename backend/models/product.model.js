import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  description: { type: String },
  brand: { type: String },
  category: { type: String },
  price: { type: Number, required: true },
  countInStock: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
}, {
  timestamps: true,
});

export default mongoose.model('Product', productSchema);
