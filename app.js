const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path'); 
const app = express();
const port = process.env.PORT || 3001;

// Create a middleware function to log requests
function logRequest(req, res, next) {
  const logFilePath = path.join(__dirname, 'log.txt');
  const logData = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;

  fs.appendFile(logFilePath, logData, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });

  next();
}

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logRequest); // Use the middleware to log requests

// Serve the HTML file
app.get('/', (req, res) => {
  fs.readFile('index.html', 'utf8', (err, content) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }
    res.send(content);
  });
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/movies', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  });

app.get('/movies', async (req, res) => {
  try {
    const db = mongoose.connection;
    const collection = db.collection('moviedata');

    const movies = await collection.find({}).toArray();

    res.json(movies);
  } catch (error) {
    console.error('Error fetching movie data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Handle movie data POST request
app.post('/add', (req, res) => {
  const moviename = req.body.moviename;
  const movieimg = req.body.movieimg;
  const movieData = {
    moviename,
    movieimg,
  };
  const db = mongoose.connection;
  const collection = db.collection('moviedata');
  collection.insertOne(movieData, (error) => {
    if (error) {
      console.error('Error inserting movie data:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      console.log('Movie data inserted into "moviedata" collection.');
      res.status(204).send();
    }
  });
});

app.delete('/delete/:id', async (req, res) => {
  try {
    const movieID = req.params.id; // Get the movie ID from the request parameters

    if (!mongoose.Types.ObjectId.isValid(movieID)) {
      return res.status(400).json({ message: 'Invalid movie ID' });
    }

    const db = mongoose.connection;
    const collection = db.collection('moviedata');

    const result = await collection.deleteOne({ _id: new mongoose.Types.ObjectId(movieID) });

    if (result.deletedCount === 1) {
      console.log('movie deleted!');
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'movie not found' });
    }
  } catch (error) {
    console.error('Error deleting movie:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.put('/update/:id', async (req, res) => {
  try {
    const movieID = req.params.id;
    const newMovieName = req.body.newMovieName;

    if (!mongoose.Types.ObjectId.isValid(movieID)) {
      return res.status(400).json({ message: 'Invalid movie ID' });
    }

    const db = mongoose.connection;
    const collection = db.collection('moviedata');

    const result = await collection.updateOne(
      { _id: new mongoose.Types.ObjectId(movieID) },
      { $set: { moviename: newMovieName } }
    );

    if (result.matchedCount === 1) {
      console.log('Movie updated!');
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    console.error('Error updating movie:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
