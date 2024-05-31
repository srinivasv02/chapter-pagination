const express = require('express');
const bodyParser = require('body-parser'); 
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

const app = express();
app.use(cors());
app.use(bodyParser.json());

const url = 'mongodb://localhost:27017';
const dbName = 'pagination'; 
const collectionName = 'users'; 

app.get('/chapter/getMyChapter_v1/:userId/:otherId', async (req, res) => {
  const { userId, otherId } = req.params;
  const pageNo = parseInt(req.query.pageNo) || 1;
  const pageSize = 10;
  const skip = (pageNo - 1) * pageSize;

  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Fetch users with pagination, including only 'name' and 'id' fields
    const users = await collection.find({})
                                  .project({ name: 1, id: 1, _id: 0 })
                                  .skip(skip)
                                  .limit(pageSize)
                                  .toArray();

    if (!users || users.length === 0) {
      throw new Error('No users found');
    }

    res.json(users);
    client.close();
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
