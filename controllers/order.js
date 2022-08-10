const { Order } = require("../models/Order");

// order controller
module.exports = {
    // create order
    create: async (req, res) => {
        try {
            //לבדוק אם ללקוח הספציפי יש הזמנה פתוחה
            // create order
            const newOrder = new Order(req.body);
            // save order
            const order = await newOrder.save();
            // chack if order is saved
            if (order) {
                // send order
                res.send(order);
            } else {
                // send error
                res.status(400).send("Order not created");
            }
        } catch (error) {
            // send error
            res.status(400).send(error);
        }
    },
    // get all orders
    getAll: async (req, res) => {
        let filter = {};
        if (res.locals.role === "customer") filter = { customer: res.locals.user_id };
        try {
            // get all orders
            const orders = await Order.find(filter);
            // check if orders are found
            if (orders) {
                // send orders
                res.send(orders);
            }
        } catch (error) {
            // send error
            res.status(400).send(error);
        }
    },
    cart: async (req, res) => {
        try {
            // get all orders
            const orders = await Order.find({ customer: res.locals.user_id, isCart: true });
            // check if orders are found
            if (orders) {
                // send orders
                res.json(orders);
            }
        } catch (error) {
            // send error
            res.status(400).json(error);
        }
    },
    addToCart: async (req, res) => {
        try {
            // check it cart exists
            const cart = await Order.findOne({ customer: res.locals.user_id, isCart: true });
            // check if cart is found
            if (cart) {
                // check if product is in cart
                const product = cart.items.find(item => item.product == req.body.product);
                // check if product is in cart
                if (product) {
                    // update product quantity
                    product.quantity += Number(req.body.quantity);
                    // send cart
                    const order = await cart.save();
                    // check if cart is saved
                    if (order) {
                        // send cart
                        res.json(order);
                    }
                } else {
                    // add to cart
                    cart.items.push(req.body);
                    // save cart
                    const order = await cart.save();
                    // check if cart is saved
                    if (order) {
                        // send cart
                        res.json(order);
                    }
                }
            } else {
                // create cart
                const newOrder = new Order({
                    customer: res.locals.user_id,
                    isCart: true,
                    items: [req.body]
                });
                // save cart
                const order = await newOrder.save();
                // check if cart is saved
                if (order) {
                    // send cart
                    res.json(order);
                }
            }
        } catch (error) {
            // send error
            res.status(400).send(error);
        }
    },
    removeFromCart: async (req, res) => {
        try {
            // check it cart exists
            const cart = await Order.findOne({ customer: res.locals.user_id, isCart: true });
            // check if cart is found
            if (cart) {
                cart.items = cart.items.filter(item => item.product != req.body.product);
                // save cart
                const order = await cart.save();
                // check if cart is saved
                if (order) {
                    // send cart
                    res.json(order);
                } 
            } else {
                // send error
                res.status(400).send("Cart not found");
            }
        } catch (error) {
            // send error
            res.status(400).send(error);
        }
    },
    checkout: async (req, res) => {
        try {
            // check it cart exists
            const cart = await Order.findOne({ customer: res.locals.user_id, isCart: true });
            // check if cart is found
            if (cart) {
                // set cart to false
                cart.isCart = false;
                cart.shipAddress = req.body.shipAddress;
                cart.cost = req.body.cost;
                // save cart
                const order = await cart.save();
                // check if cart is saved
                if (order) {
                    // send cart
                    res.json(order);
                } else {
                    // send error
                    res.status(400).send("Order not saved");
                }
            }
        } catch (error) {
            // send error
            res.status(400).send(error);
        }
    },
    // get order by id
    getById: async (req, res) => {
        try {
            // get order by id
            const order = await Order.findById(req.params.id);
            // check if order is found
            if (order) {
                // send order
                res.send(order);
            }
        } catch (error) {
            // send error
            res.status(400).send(error);
        }
    },
    // update order
    updateStatus: async (req, res) => {
        console.log(req.body);
        try {
            // get order by id
            const order = await Order.findByIdAndUpdate(req.body.id, req.body);
            // check if order is found
            if (order) {
                // send order
                res.send(order);
            } else {
                // send error
                res.status(400).send("Order not found");
            }
        } catch (error) {
            // send error
            res.status(400).send(error);
        }
    }
}
