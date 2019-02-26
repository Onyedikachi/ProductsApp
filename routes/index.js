const productRoutes =  require('./products_routes');

module.exports =  function(app, db){
    productRoutes(app, db);
}