import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import Sale from "../models/saleModel.js";

const addOrderItems = async(req, res, next) => {
  //user id via authProtect middleware
  const { seller, orderItems, paymentMethod, itemsPrice, taxPrice, totalPrice } = req.body;
  if(orderItems && orderItems.length === 0) {
    res.status(401)
    throw new Error("No order items");
  }
  try {
    const order = new Order({
      orderItems, paymentMethod, itemsPrice, taxPrice, 
      totalPrice, user: req.user._id, seller
    })

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch(error) {
    return next(error);
  }
}

// @desc     Get order by ID
// @route    GET /api/orders/:id
// @access   Private
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
    .populate("user", "name email")
    .populate({ path: 'orderItems.seller', model: 'User', select: "name email"});

    if(req.user.name !== order.user.name) {
      res.status(400)
      throw new Error("You can not view other orders");
    }

    if(order) {
      res.json(order);
    } else {
      res.status(404)
      throw new Error("Order not found");
    }
  }catch(error) {
    return next(error);
  }
}

const updateOrderToPaid = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if(order) {
      if(order.isPaid) {
        res.status(400)
        throw new Error("Order already paid");
      }
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address
      }
    
      const sellerBalanceIncrements = [];
      await order.orderItems.map( async (item) => {
        const product = await Product.findById(item.product);
        sellerBalanceIncrements.push({id: item.seller, price: item.price*item.qty});

        //Create SaleDocument for SaleModel with, sellerId, productName, qty, price, category, user or buyer
        const saleDocument = new Sale({sellerId: item.seller, buyerId: order.user, productId: item.product, productName: item.name, qty: item.qty, image: item.image, price: item.price, category: item.category});
        await saleDocument.save();

        if(product.countInStock > 0) {
          product.countInStock = product.countInStock - item.qty;
        }
        if(product.countInStock < 0) {
          product.countInStock = 0;
        }
  
        let productKeys = [];
        for(let i=0; i<item.qty; i++) {
          productKeys.push(await product.serialKeys.pop().key);
        }
        
        await order.getYourKeys(productKeys);
        await product.save();
      })

      setTimeout(async() => {
        await updateBalanceOfSellers(sellerBalanceIncrements);
        const updatedOrder = await order.save();
        res.json(updatedOrder);
      }, 2000);

    } else {
      res.status(401)
      throw new Error("Payment Failed");
    }
  } catch(error) {
    return next(error);
  }
}

//helper
const updateBalanceOfSellers = async(sellers) => {
  for (let i=0; i<sellers.length; i++) {
    const seller = await User.findById(sellers[i].id);
    seller.balance += sellers[i].price;
    await seller.save();
  }
}

const userOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({user: req.user._id})
    .populate({ path: 'orderItems.seller', model: 'User', select: "name email"})
    .select("-purchasedKeys");

    if(orders.length === 0) {
      res.status(404);
      throw new Error("User dont have any orders");
    }
    res.status(200).json(orders);
  }catch(error) {
    return next(error);
  }
}

export {addOrderItems, getOrderById, updateOrderToPaid, userOrders};