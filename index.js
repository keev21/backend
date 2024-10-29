const express = require('express');
const app = express();
app.use(express.json());

//CORSE
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



const stripe = require('stripe')('sk_test_51QEvYxHvRGf2ixKse9tSs7HayILi5QTxguLA6kBvb0quRkuQ3Ku7noS9Dtt8BNuStQtH4HYr7uGmHVI9NHMv9Ejd00S2g9QaeI');

app.post('/create-charge', async (req, res) => {
    const { source, email } = req.body;
    //return console.log(source);

    const customer = await stripe.customers.create({ email });
    customer.source = source;

    const charge = await stripe.charges.create({
        amount: source.amount,
        currency: source.currency,
        source: source.id,
        description: "my first sell",
        customer: customer.id
    });
    if(charge.paid){
        return res.status(200).send({
            status: 'success',
            message: 'ok'
        });
    }

  
});

app.listen(4300, () => {
    console.log('Server is up on port 4300');  
});