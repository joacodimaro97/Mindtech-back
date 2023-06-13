import Product from "../../models/Product.js";


let create = async(req, res, next) => {
            try {
                await Product.create(req.body)
                return res.status(201).json({
                    message : 'Product created'
                })
                
            } catch (error) {
                next(error)
                
            }
}



export default create