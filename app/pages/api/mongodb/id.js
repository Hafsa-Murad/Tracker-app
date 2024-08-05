
import { MongoClient, ObjectId } from "mongodb";

const uri = "mongodb+srv://hafsamurad2022:O5vmLk3uQchPoEWc@cluster0.off7fn9.mongodb.net/tracker-app?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      await client.connect();
      const database = client.db('inventory');
      const collection = database.collection('products');
      await collection.deleteOne({ _id: new ObjectId(id) });
      res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      await client.close();
    }
  }
}

