require("dotenv").config();
let db = require("../models"),
	nodemailer = require("nodemailer"),
	crypto = require("crypto");

async function getToken(){
	let buf = await crypto.randomBytes(20);
	return buf.toString("hex");
}

async function transportMail(sub, txt, receiver){
	let transport = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: process.env.GMAILUSER,
			pass: process.env.GMAILPWD
		}
	})
	let mailOptions = {
		to: receiver,
		from: process.env.GMAILUSER,
		subject: sub,
		text: txt
	}
	await transport.sendMail(mailOptions);
}

module.exports = {
	getToken: getToken,
	transportMail: transportMail
}