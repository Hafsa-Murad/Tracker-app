
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://hafsamurad2022:O5vmLk3uQchPoEWc@cluster0.off7fn9.mongodb.net/tracker-app?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await client.connect();
      const database = client.db('inventory');
      const collection = database.collection('products');
      const products = await collection.find({}).toArray();
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      await client.close();
    }
  } else if (req.method === 'POST') {
    const newProduct = req.body;
    try {
      await client.connect();
      const database = client.db('inventory');
      const collection = database.collection('products');
      await collection.insertOne(newProduct);
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      await client.close();
    }
  }
}
