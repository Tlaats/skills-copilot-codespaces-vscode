// Create web server
const express = require('express');
const app = express();
const port = 3000;

// Add middleware
app.use(express.json());

// Create comments array
const comments = [
  { id: 1, comment: 'Hello' },
  { id: 2, comment: 'Hi' },
  { id: 3, comment: 'Hey' }
];

// Get all comments
app.get('/api/comments', (req, res) => {
  res.send(comments);
});

// Get comment by id
app.get('/api/comments/:id', (req, res) => {
  const comment = comments.find(c => c.id === parseInt(req.params.id));
  if (!comment) return res.status(404).send('The comment with the given ID was not found');
  res.send(comment);
});

// Create new comment
app.post('/api/comments', (req, res) => {
  const comment = {
    id: comments.length + 1,
    comment: req.body.comment
  };
  comments.push(comment);
  res.send(comment);
});

// Update comment
app.put('/api/comments/:id', (req, res) => {
  const comment = comments.find(c => c.id === parseInt(req.params.id));
  if (!comment) return res.status(404).send('The comment with the given ID was not found');

  comment.comment = req.body.comment;
  res.send(comment);
});

// Delete comment
app.delete('/api/comments/:id', (req, res) => {
  const comment = comments.find(c => c.id === parseInt(req.params.id));
  if (!comment) return res.status(404).send('The comment with the given ID was not found');

  const index = comments.indexOf(comment);
  comments.splice(index, 1);

  res.send(comment);
});

// Listen on port
app.listen(port, () => console.log(`Listening on port ${port}...`));

// Run 'node comments.js' to start the server
// Use Postman to interact