const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");


app.use(express.json());
app.use(cors());

mercadopago.configure({
	access_token: "TEST-7937315528681088-091111-173375a720504b5d4016536303965ae4-378384743",
});

app.get("/", function (req, res) {
	res.send("mercado pago funciona!");
});


app.post("/create_preference", (req, res) => {

	let preference = {
		items: [
			{
				title: req.body.description,
				unit_price: Number(req.body.price),
				quantity: Number(req.body.quantity),
			}
		],
		back_urls: {
			"success": "http://localhost:5173",
			"failure": "http://localhost:5173",
			"pending": "http://localhost:8080/feedback"
		},
		auto_return: "approved",
	};

	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({
				id: response.body.id
			});
		}).catch(function (error) {
			console.log(error);
		});
});

app.get('/feedback', function (req, res) {
	res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
});

app.listen(8080, () => {
	console.log("The server is now running on Port 8080");
});