const express = require('express');
const cors = require('cors'); 
const app = express();

app.use(cors()); 


const chapters = [
  { _id: 1, title: 'Chapter 1', description: 'Description 1' },
  { _id: 2, title: 'Chapter 2', description: 'Description 2' },
  { _id: 3, title: 'Chapter 3', description: 'Description 3' },
  { _id: 4, title: 'Chapter 4', description: 'Description 4' },
  { _id: 5, title: 'Chapter 5', description: 'Description 5' },
  { _id: 6, title: 'Chapter 6', description: 'Description 6' },
  { _id: 7, title: 'Chapter 7', description: 'Description 7' },
  { _id: 8, title: 'Chapter 8', description: 'Description 8' },
  { _id: 9, title: 'Chapter 9', description: 'Description 9' },
  { _id: 10, title: 'Chapter 10', description: 'Description 10' },
  { _id: 11, title: 'Chapter 11', description: 'Description 11' },
  { _id: 12, title: 'Chapter 12', description: 'Description 12' },
  
];

app.get('/chapter/getMyChapter_v1/:userId/:otherId', (req, res) => {
  const { userId, otherId } = req.params;
  const pageNo = parseInt(req.query.pageNo) || 1;
  const pageSize = 10;
  const skip = (pageNo - 1) * pageSize;
  const paginatedChapters = chapters.slice(skip, skip + pageSize);

  res.json(paginatedChapters);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
