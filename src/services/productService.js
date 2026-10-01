import { readProducts, writeProducts } from "../database/productDatabase.js";

const cache = {};

const delay = async () => {
    await new Promise((resolve) => {
        setTimeout(resolve, 1500);
    });

    return readProducts();
};

export const getProducts = async () => {
    const key = "/products";

    if (cache[key]) {
        return cache[key];
    }

    const products = await delay();
    cache[key] = products;
    return products;
};

export const getProductById = async (id) => {
    const key = `/products/${id}`;

    if (cache[key]) {
        return cache[key];
    }

    const products = await delay();
    const product = products.filter((item) => item.id == id);
    cache[key] = product;
    return product;
};

export const createProduct = async (product) => {
    const products = await readProducts();
    products.push(product);
    await writeProducts(products);
    Object.keys(cache).forEach((key) => delete cache[key]);
    return product;
};

export const updateProduct = async (id, product) => {
    const products = await readProducts();
    const index = products.findIndex((item) => item.id == id);

    if (index === -1) {
        return null;
    }

    products[index] = { ...product, id: products[index].id };
    await writeProducts(products);
    Object.keys(cache).forEach((key) => delete cache[key]);
    return products[index];
};

export const patchProduct = async (id, product) => {
    const products = await readProducts();
    const index = products.findIndex((item) => item.id == id);

    if (index === -1) {
        return null;
    }

    products[index] = { ...products[index], ...product };
    await writeProducts(products);
    Object.keys(cache).forEach((key) => delete cache[key]);
    return products[index];
};

export const deleteProduct = async (id) => {
    const products = await readProducts();
    const index = products.findIndex((item) => item.id == id);

    if (index === -1) {
        return null;
    }

    const deletedProduct = products.splice(index, 1)[0];
    await writeProducts(products);
    Object.keys(cache).forEach((key) => delete cache[key]);
    return deletedProduct;
};
