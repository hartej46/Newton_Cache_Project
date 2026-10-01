import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
} from "../services/productService.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await getProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProduct = async (req, res) => {
    try {
        const products = await getProductById(req.params.id);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addProduct = async (req, res) => {
    try {
        const product = await createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const replaceProduct = async (req, res) => {
    try {
        const product = await updateProduct(req.params.id, req.body);

        if (!product) {
            return res.status(404).json({ error: "product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const editProduct = async (req, res) => {
    try {
        const product = await patchProduct(req.params.id, req.body);

        if (!product) {
            return res.status(404).json({ error: "product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const removeProduct = async (req, res) => {
    try {
        const product = await deleteProduct(req.params.id);

        if (!product) {
            return res.status(404).json({ error: "product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};