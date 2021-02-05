import mongoose from "mongoose";

const saleSchema = mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  buyerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product"},
  productName: { type: String, required: true},
  qty: { type: Number, required: true},
  image: { type: String, required: true},
  price: { type: Number, required: true},
  category: { type: String, required: true },
}, {
  timestamps: true
});

const Sale = mongoose.model('Sale', saleSchema);
export default Sale;