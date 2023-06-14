import Product from "../../models/Product.js";


const updateProduct = async (req, res) => {
    const { id } = req.params; 
    const { name, description, price, quantity, images, brand, category } = req.body;

    try {

        const updatedProduct = await Product.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    name,
                    description,
                    brand,
                    category,
                    price,
                    quantity,
                    images
                }
            },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json({ message: 'Producto actualizado correctamente' });
    } catch (error) {
        console.log('Error al actualizar el producto:', error);
        res.status(500).json({ message: 'Error al actualizar el producto' });
    }
};

export default updateProduct;



