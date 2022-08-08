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
            }else{
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
    update: async (req, res) => {
        try {
            // get order by id
            const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
            // check if order is found
            if (order) {
                // send order
                res.send(order);
            }else{
                // send error
                res.status(400).send("Order not found");
            }
        } catch (error) {
            // send error
            res.status(400).send(error);
        }
    },
    // delete order
    delete: async (req, res) => {
        try {
            // get order by id
            const order = await Order.findByIdAndDelete(req.params.id);
            // check if order is found
            if (order) {
                // send order
                res.send(order);
            }
        } catch (error) {
            // send error
            res.status(400).send(error);
        }
    }
}
