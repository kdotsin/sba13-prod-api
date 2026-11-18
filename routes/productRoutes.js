import e, { Router } from "express";
import { Product } from "../models/Product.js";

const route = e.Router();

route.post('/products', async (req, res) => {
  try {
    const newProd = await Product.create(req.body);
    console.log('successfully created product');
    res.status(200).json(newProd);
  } catch (err) {
    console.error('failed to create new product', err);
    res.status(400).json({ error: 'did not create product', details: err.message });
  }
})

export default route;