import Product from "../models/Product.js";

export default async (req, res, next)=>{
    try{
        const existingProduct = await Product.findOne({name:req.body.name});
        if (existingProduct){
            return res.status(409).json({
                success:false,
                message: "The product already exists in the database",
            });
        }
        return next();
    }catch (error){
        return res.status(500).json({
            success:false,
            message: "Internal server error",
        })
    }
    
} 