// import { MongoClient } from "mongodb";
// import { NextResponse } from "next/server";

// export async function GET(request){
   
// // Replace the uri string with your connection string.
// const uri = "mongodb+srv://hafsamurad2022:O5vmLk3uQchPoEWc@cluster0.off7fn9.mongodb.net/tracker-app?retryWrites=true&w=majority&appName=Cluster0";
// const client = new MongoClient(uri);
//   try {
//     const database = client.db('inventary');
//     const movies = database.collection('tracker');
//     // Query for a movie that has the title 'Back to the Future'
//     const query = { title: 'Back to the Future' };
//     const movie = await movies.findOne(query).toArray();
//     console.log(movie);
//     return NextResponse.json({"a": 34, movie});
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }




// import { MongoClient } from "mongodb";
// import { NextResponse } from "next/server";

// export async function GET(request) {
//   const uri = "mongodb+srv://hafsamurad2022:O5vmLk3uQchPoEWc@cluster0.off7fn9.mongodb.net/tracker-app?retryWrites=true&w=majority&appName=Cluster0";
//   const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//   try {
//     await client.connect();
//     const database = client.db('inventary');
//     const movies = database.collection('tracker');
//     const query = { title: 'Back to the Future' };
//     const movie = await movies.findOne(query);

//     if (movie) {
//       console.log(movie);
//       return NextResponse.json({ movie });
//     } else {
//       return NextResponse.json({ message: 'Movie not found' }, { status: 404 });
//     }
//   } catch (error) {
//     console.error('Error connecting to the database:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   } finally {
//     await client.close();
//   }
// }


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
