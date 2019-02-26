module.exports = function(app, db){
    
    const path = require('path');
    const Product =  require('../models/Product');
    
    // Fetch all the products
    app.get('/api/products',async (req, res)=>{
        const products = await Product.find({}).select('name price');
        
        res.json(products);
    });

    // Get Products by ID
    app.get('/api/product/:id', async (req,res)=>{
        const id =  req.params.id;
        const product = await Product.findById(id, (err,product)=>{
            if(err){
                throw err;
            }else{
                res.status(200);
                res.json(product);
            }
        }) 
    });
};