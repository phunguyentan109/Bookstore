const db = require("../models");

exports.getOrderBook = async(req, res) => {
    try{
        let list = await db.OrderBook.find({order: req.params.order_id}).populate("book").exec();
		res.json(list);
    }catch(err){
        res.send(err);
    }
}

exports.createOrderBook = async(req, res) => {
	try{
		let orderbook = await db.OrderBook.create(req.body);
		res.json(orderbook);
	}catch(err){
		res.send(err);
	}
}
