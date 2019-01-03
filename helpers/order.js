const db = require("../models");

exports.getOrders = async(req, res) => {
    try{
        let orders = await db.Order.find({}).populate("book").exec();
        res.json(orders);
    }catch(err) {
        res.send(err);
    }
}

exports.createOrder = async(req, res, next) => {
    try{
        let order = req.body;
		order.user = req.user._id;
		let newOrder = await db.Order.create(order);
		res.json(newOrder._id);
    }catch(err){
        res.send(err);
    }
}
