const Product = require('./product.model.js');

///Create new Product
exports.create = (req, res) => {
    // Request validation
      if(!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Create a Product
    const product = new Product({
        title: req.body.title || "No product title",
        description: req.body.description,
        price: req.body.price,
        company: req.body.company
    });

    // Save Product in the database
    product.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the product."
        });
    });
};

// Fetch all the records from DB.

exports.findAll = (req, res) => {
    Product.find()
    .then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving products."
        });
    });
};

  exports.findOne=(req, res)=>{
    Product.findById(req.params.productId)
    .then(product=>{
      if(!product){
          return res.status(404).send({
            messgae: "Product not found with id" +req.params.productId
          });
      }
      res.send(product);
    }).catch(err=>{
      if(err.kind==='objectId'){
        return res.status(404).send({
          message:"Product not found with Id "+ req.params.productId
        });
      }
      return res.status(500).send({
        message:"Something wrong retrieving product with ID"+ req.params.productId
      });
    });
  };

//Update a product

exports.update=(req, res)=>{

  if(!req.body){
    return res.status(400).send({
      message: "Product content can not be empty"
    });
  };

  Product.findByIdAndUpdate(req.params.productId, {
    title: req.body.title||"No Product Title",
    description: req.body.description,
    price: req.body.price,
    company: req.body.company
  },{new: true})
  .then(product=>{
      if(!product){
        res.status(404).send({
          message: "Product not found with id"+ req.params.productId
        });
      }
      res.send(Product);
  }).catch(err=>{
    if(err.kind==='objectId'){
        return res.status(404).send({
          message:"Product not found with id"+req.params.productId
        });
    }
    return res.status(500).send({
        message:"Something wrong with product Id"+ req.params.productId
    });
  });

};

// Deletiong a Product.
exports.delete=(req, res)=>{
  Product.findByIdAndRemove(req.params.productId)
  .then(product=>{
    if(!product){

      return res.status(404).send({
        message:"Prodcut not found with id"+ req.params.productId
      });
    }

    res.send({message: "Product deleted Successfully"})
  }).catch(err=>{
    if(err.kind==='objectID'|| err.name==='NotFound'){
      return res.status(404).send({
        message: "Product not found with id"+ req.params.productId
      });
    };
    return res.status(500).send({
        message:"Could not delete product with id"+ req.params.productId
    });
  });

};
