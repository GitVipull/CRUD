module.exports = (app)=>{
    const products = require('./product.controller.js');


app.post('/products', products.create);

app.get('/products', products.findAll);

app.get('/product/:productId', products.findOne);

app.put('/products/:productId', products.update);

app.delete('/products/:productId', products.delete);

}
