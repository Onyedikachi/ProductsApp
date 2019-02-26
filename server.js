const express = require('express');
const monogoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload =  require('express-fileupload');
const db  =  require("./config/db");
const path = require('path');
const Product =  require('./models/Product');

const port = 8000;

monogoose.connect(db.url, { useNewUrlParser: true });

const app = express();

app.use(require('express-edge'));
app.set('views', `${__dirname}/views`);
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(fileUpload());

require('./routes')(app, {});

app.get('/', (req,res)=>{
    res.render('create');
})

// Create New Product
let newproduct;
app.post('/products', (req, res)=>{
    const {image} =  req.files;
    
    image.mv(path.resolve(__dirname,'public/products', image.name),(err)=>{
        Product.create({
            ...req.body,
            image: `/products/${image.name}`,
        }, (err, product)=>{
            newproduct = product;
            if(err){
                throw err;
                res.json({'status': err});
            }else{
                return res.redirect('/product');
            }
        });
    })
});

app.get('/product', (req, res)=>{
    let product;
    if (newproduct) product = newproduct;
    else return res.redirect('/');
    res.render('product',{product});
});

app.listen(port,()=>{
    console.log('Listening on Port ' + port);
});