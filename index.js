let express = require("express");
let cors = require("cors");

let port = 3000;
let app = express();
app.use(cors());

let taxRate = 5/100;
let discountPercentage = 10/100;
let loyaltyRate = 2;

//Endpoint : 1

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseInt(req.query.newItemPrice)
  let cartTotal = parseInt(req.query.cartTotal)
  let totalCarValue = newItemPrice + cartTotal;
  res.send(totalCarValue.toString());
  
});
  
//Endpoint : 2
app.get('/membership-discount', (req ,res ) =>{
  let cartTotal = parseFloat(req.query.cartTotal)
  let isMember = req.query.isMember === 'true';
  let finalPrice;
  if(isMember){
    finalPrice = cartTotal - (cartTotal * discountPercentage);
  }else{
    finalPrice = cartTotal;
  }
  res.send(finalPrice.toString());
});

//Endpoint : 3

app.get('/calculate-tax', (req ,res) => {
  let cartTotal = parseFloat(req.query.cartTotal)
  let finalPrice = cartTotal * taxRate;  
  res.send(finalPrice.toString());
});

// Endpoint :4

app.get('/estimate-delivery' , (req , res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let result;
  
  if(shippingMethod === 'standard') {
    result = distance/50;
  } else {
    result = distance/100;
  }
  res.send(result.toString());
});

//Endpoint 5:

app.get('/shipping-cost', (req , res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let result = weight * distance * 0.1;
  res.send(result.toString());
});

// Endpoint : 6

app.get('/loyalty-points', (req , res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = purchaseAmount * loyaltyRate;
  res.send(loyaltyPoints.toString());
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  