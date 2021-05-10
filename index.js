require('dotenv').config();

const express = require('express');
const router = express.Router();
const session = require('express-session');
const bodyParser = require('body-parser');



const MongoClient = require('mongodb').MongoClient;
const objectId = require("mongodb").ObjectId;

const app = express();
const port = 8080;

const connection = getConnection();

function getConnection() {

  const {DB_USER:user,DB_NAME:db,DB_CONNECTION:connection,DB_PASSWORD:password,local} = process.env
  if (local) return `mongodb://localhost:27017`

  const conn = `mongodb+srv://${user}:${password}@${connection}/${db}?retryWrites=true&w=majority`

  console.log(conn);
  return conn;
}

const mongoOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true
};

app.use(jwt({ secret : process.env.SECRET }));

app.use(bodyParser.json());

router.get("/api/notes/list", (req, res) => {
  let folder = req.query.folder;
  let userID = req.query.userID;
  const client = new MongoClient(connection, mongoOptions);
  client.connect(async (err) => {
    const db = client.db('regulars');
    let collection = null;
    if (folder) {
      if(userID)
        collection = await db.collection('notes').find({ userID: userId }).toArray()
      else
        collection = await db.collection('notes').find({ folderId: folder }).toArray();
    } else {
      collection = await db.collection('notes').find({ userId }).toArray();
    }
    res.send(collection);
  })
});

router.put('/api/notes/:id', (req, res) => {
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

router.get("/api/notes/:id", (req, res) => {
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

router.post("/api/notes/", (req, res) => {
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

router.delete('/api/notes/:id', (req, res) => {
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

router.get('/api/notes/count', (req, res) => {
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

router.get('/api/folders/', (req, res) => {
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

router.post('/api/folders/:name', (req, res) => {
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

router.delete('/api/folders/:name', (req, res) => {
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

router.post('/api/user/login', (req,res) => {
  const session = req.session;
  
  const {login} = req.body;
  session.user = login
  res.send(session);
});

app.post('/api/user/register',(req,res) => {
  const {login,password} = req.body;
  const client = new MongoClient(connection,mongoOptions);
  client.connect(async (err) => {
    try{
      const db = client.db('regulars');
      const result = await db.collection('users').insertOne({login,password});
      res.sendStatus(200);
    }catch(err){
      res.send(err);
    }
  });
});


app.use('/',router);
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});