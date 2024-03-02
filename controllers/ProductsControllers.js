const Product = require('../models/Products');


module.exports = {
    createProduct: async(req, res) =>{
        const newProduct = new Product(req.body);
        try{
            await newProduct.save();
            res.status(200).json("Product Created Sucessfully")
        } catch(error){
            res.status(500).json("Failed to Create the Products")
        }
    },
    getAllProduct: async(req, res) =>{
        try{
            const products = await Product.find().sort({ createdAt: -1})
            res.status(200).json(products)
        } catch(error){
            res.status(500).json("Failed to Create the Products")
        }
    },
    getProduct: async(req, res) =>{
        try {
            const product = await Product.findById(req.params.id)
            res.status(200).json(product)
        } catch (error) {
            res.status(500).json("Failed to Create the Products")        
        }
    },
    searchProduct:async(req, res) =>{
        try {
            const result = await Product.aggregate(
                [
                    {
                      $search: {
                        index: "furniture",
                        text: {
                          query: req.params.key,
                          path: {
                            wildcard: "*"
                          }
                        }
                      }
                    }
                  ]
            )
            res.status(200).json(product)
                  //aggregate is helps us to do data proceessing like search
        } catch (error) {
            res.status(500).json("failed to get the product")
        }
    }
}