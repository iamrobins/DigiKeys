import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true }, //Games or Softwares
  description: { type: String, required: true },
  // rating: { type: Number, default: 0 },
  // reviews: [reviewSchema],
  // totalReviews: { type: Number, default: 0 },
  price: { type: Number, required: true, default: 0 },
  countInStock: { type: Number, default: 0 },
  serialKeys:[{ key: {type: String, required: true} }]
}, { timestamps: true });

//methods
productSchema.methods.updateKeysAndStock = function(productKeys) {
  this.serialKeys = [...this.serialKeys, ...productKeys];
  this.countInStock = this.countInStock + productKeys.length;
}

const Product = mongoose.model('Product', productSchema);
export default Product;