import 'dotenv/config';
import e from 'express';
import route from './routes/productRoutes.js';
import { connectDB } from './config/connections.js';

const app = e();
const port = 3000;

connectDB()

app.use(e.json());

app.use('/api', route);

app.listen(port, () => {
  console.log('server is running at localhost:', port)
})