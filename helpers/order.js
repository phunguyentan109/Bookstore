const db = require("../models");

exports.getOrders = async(req, res) => {
    try{
        let orders = await db.Order.find({}).populate("book").exec();
        res.json(orders);
    }catch(err) {
        res.send(err);
    }
}

exports.createOrder = async(req, res) => {
    try{
        let order = req.body;
		order.user = req.user._id;
		let newOrder = await db.Order.create(order);
		res.json(newOrder._id);
    }catch(err){
        res.send(err);
    }
}

exports.updateOrder = async(req, res) => {
    try{
        await db.Order.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json("Update successfully!");
    }catch(err){
        res.send(err);
    }
}
