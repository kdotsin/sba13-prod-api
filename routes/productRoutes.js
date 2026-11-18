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

route.get('/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const readProduct = await Product.findById(id);
    console.log('successsfully found product');
    res.status(200).json(readProduct);
  } catch (err) {
    console.error('failed to retrieve singular product', err);
    res.status(400).json({ error: 'cannot retrieve product', details: err.message });
  }
})

route.put('/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const updatedProd = await Product.findByIdAndUpdate(id, body, { returnDocument: 'after' })
    console.log('successsfully updated product');
    res.status(200).json(updatedProd);
  } catch (err) {
    console.error('failed to update singular product', err);
    res.status(400).json({ error: 'cannot update product', details: err.message });
  }
})

route.delete('/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProd = await Product.findByIdAndDelete(id);
    console.log('successsfully deleted product');
    res.status(200).json(deletedProd);
  } catch (err) {
    console.error('failed to delete singular product', err);
    res.status(400).json({ error: 'cannot delete product', details: err.message });
  }
})

route.get('/products', async (req, res) => {
  try {
    const category = req.query.category || "";
    const minPrice = req.query.minPrice || 1;
    const maxPrice = req.query.maxPrice || 100;
    const sortBy = req.query.sortBy == 'price_desc' ? -1 : 1;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const filteredProd = await Product.find({
      category: category,
      price: { $gt: minPrice, $lt: maxPrice },
    })
      .sort({ price: sortBy })
      .skip((page - 1) * limit)
      .limit(limit);

    console.log('successsfully found products');
    res.status(200).json(filteredProd);
  } catch (err) {
    console.error('failed to fetch products', err);
    res.status(400).json({ error: 'cannot retrieve product', details: err.message });
  }
})

export default route;