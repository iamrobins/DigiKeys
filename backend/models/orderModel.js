// import mongoose from 'mongoose';
//Orignal when I was not saving Seller in OrderItems

// const orderSchema = mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: 'User'
//   },
//   seller: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: 'User'
//   },
//   orderItems: [
//     {
//       name: { type: String, required: true},
//       qty: { type: Number, required: true},
//       image: { type: String, required: true},
//       price: { type: Number, required: true},
//       category: { type: String, required: true },
//       product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product'}
//     }
//   ],
//   paymentMethod: {
//     type: String,
//     required: true
//   },
//   paymentResult: {
//     id: { type: String },
//     status: { type: String },
//     update_time: { type: String },
//     email_address: { type: String },
//   },
//   itemsPrice: {
//     type: Number,
//     required: true,
//     default: 0.0
//   },
//   taxPrice: {
//     type: Number,
//     required: true,
//     default: 0.0
//   },
//   totalPrice: {
//     type: Number,
//     required: true,
//     default: 0.0
//   },
//   purchasedKeys: [
//     []
//   ],
//   isPaid: {
//     type: Boolean,
//     required: true,
//     default: false
//   },
//   paidAt: {
//     type: Date
//   }
// }, {
//   timestamps: true
// })

// orderSchema.methods.getYourKeys = function(productKeys) {
//   // this.purchasedKeys = [...this.purchasedKeys, ...productKeys];
//   this.purchasedKeys.push(productKeys);
// }

// const Order = mongoose.model('Order', orderSchema);
// export default Order;


import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  orderItems: [
    {
      name: { type: String, required: true},
      qty: { type: Number, required: true},
      image: { type: String, required: true},
      price: { type: Number, required: true},
      category: { type: String, required: true },
      product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product'},
      seller: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
    }
  ],
  paymentMethod: {
    type: String,
    required: true
  },
  paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String },
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  purchasedKeys: [
    []
  ],
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  paidAt: {
    type: Date
  }
}, {
  timestamps: true
})

orderSchema.methods.getYourKeys = function(productKeys) {
  // this.purchasedKeys = [...this.purchasedKeys, ...productKeys];
  this.purchasedKeys.push(productKeys);
}

const Order = mongoose.model('Order', orderSchema);
export default Order;