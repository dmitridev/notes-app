const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const objectId = require("mongodb").ObjectId;
const session = require('express-session');

require('dotenv').config();

const express = require('express');
const app = express();
const port = 8080;

const connection = getConnection();

function getConnection() {
  const user = process.env.DB_USER;
  const db = process.env.DB_NAME;
  const connection = process.env.DB_CONNECTION;
  const password = process.env.DB_PASSWORD;
  const local = process.env.local;

  if (local) return `mongodb://localhost:27017`

  const conn = `mongodb+srv://${user}:${password}@${connection}/${db}?retryWrites=true&w=majority`
  console.log(conn);
  return conn;
}

const mongoOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true
};


app.use(session({ secret: 'sdwerqer', saveUninitialized: true, resave: true, cookie: { secure: true } }));

app.use(bodyParser.json());

app.get("/api/notes/list", (req, res) => {
  let folder = req.query.folder;
  const client = new MongoClient(connection, mongoOptions);
  client.connect(async (err) => {
    const db = client.db('regulars');
    let collection = null;
    if (folder) {
      collection = await db.collection('notes').find({ folderId: folder }).toArray();
    } else {
      collection = await db.collection('notes').find({}).toArray();
    }
    res.send(collection);
  })
});

app.put('/api/notes/:id', (req, res) => {
  const body = req.body
  const id = req.params.id;
  const client = new MongoClient(connection, mongoOptions);
  client.connect(async (err) => {
    const db = client.db('regulars');
    delete body._id
    await db.collection('notes').updateOne(
      { _id: new objectId(id) },
      { $set: body }
    )
    res.sendStatus(200);
  })
})

app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const client = new MongoClient(connection, mongoOptions);
  client.connect(async (err) => {
    try {
      const db = client.db('regulars');
      const object = await db.collection('notes').findOne({ _id: new objectId(id) })
      res.send(object);
    } catch (err) {
      console.error(err);
    }
  })
})

app.post("/api/notes/", (req, res) => {
  const client = new MongoClient(connection, mongoOptions);
  client.connect(async (err) => {
    try {
      const db = client.db('regulars');
      const collection = db.collection('notes');
      const result = await collection.insertOne(req.body);
      res.send(result);
    } catch (err) {
      console.error(err);
    }
  })
})

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  const client = new MongoClient(connection, mongoOptions);
  client.connect((err) => {
    try {
      const db = client.db('regulars');
      const collection = db.collection('notes');
      collection.deleteOne({ _id: new objectId(id) })
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
    }
  });
})

app.get('/api/notes/count', (req, res) => {
  const client = new MongoClient(connection, mongoOptions);
  client.connect(async (err) => {
    try {
      const db = client.db('regulars');
      const collection = db.collection('notes');
      const result = await collection.count();
      res.send(result);
    } catch (err) {
      console.error(err);
    }
  });
})

app.get('/api/folders/', (req, res) => {
  const client = new MongoClient(connection, mongoOptions);
  client.connect(async (err) => {
    try {
      const db = client.db('regulars');
      const result = await db.collection('folders').find({}).toArray();
      res.send(result.map(item => ({ id: item._id, folder: item.name })));
    } catch (err) {
      console.error(err);
    }
  })
})
app.post('/api/folders/:name', (req, res) => {
  const name = req.params.name;
  const client = new MongoClient(connection, mongoOptions);
  client.connect(async (err) => {
    try {
      const db = client.db('regulars');
      const result = await db.collection('folders').insertOne({ name: name })
      res.send(result);
    } catch (err) {
      console.error(err);
    }
  })
});

app.delete('/api/folders/:name', (req, res) => {
  const name = req.params.name;
  const client = new MongoClient(connection, mongoOptions);
  client.connect(async (err) => {
    try {
      const db = client.db('regulars');
      const result = await db.collection('folders').deleteOne({ name: name });
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
    }
  });
})


app.listen(port, () => {
  console.log(`server started on port ${port}`);
});