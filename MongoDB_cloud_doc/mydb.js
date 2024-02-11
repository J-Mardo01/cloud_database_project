const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://JonR20:Mj23jm43@cluster0.vecz3dn.mongodb.net/?retryWrites=true&w=majority";
const dbName = 'Clients'; 
const collectionName = 'Names';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function insert() {
    try {
        // Connect the client to the server
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Insert some documents into the collection
        const insertResult = await collection.insertMany([
            { name: 'John', age: 30, email: "john123@thisurl.com" },
            { name: 'Jane', age: 25, email: "john456@thisurl.com" },
            { name: 'Doe', age: 40, email: "john789@thisurl.com" }
        ]);
        console.log(`${insertResult.insertedCount} documents inserted`);

    } catch (err) {
        console.log(err.stack);
    } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function update() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Update a single document
        const filter = { name: 'John' };
        const updateDoc = {
            $set: { age: 35 }
        };
        const result = await collection.updateOne(filter, updateDoc);
        console.log(`${result.modifiedCount} document updated`);
    } finally {
        await client.close();
    }
}

async function delete_content() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Delete a single document
        const filter = { name: 'Doe'};
        const result = await collection.deleteOne(filter);
        console.log(`${result.deletedCount} document deleted`);
    } finally {
        await client.close();
    }
}

async function query() {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Find a single document
        const query = { name: 'Jane' };
        const result = await collection.findOne(query);
        console.log(result);

        // Find multiple documents
        //const cursor = collection.find({});
        //await cursor.forEach(doc => console.log(doc));
    } finally {
        await client.close();
    }
}

//insert().catch(console.dir);
//update().catch(console.dir);
//delete_content().catch(console.dir);
query().catch(console.dir);
