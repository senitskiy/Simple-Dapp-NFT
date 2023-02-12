import express from 'express';
import bodyParser from 'body-parser';

//In-memory storage to store events data
let events = {};

const app = express();
app.use(bodyParser.json());

//Listen to POST request to store events
app.post('/events', (req, res) => {
  const {eventName, data} = req.body;

  events[eventName] = {
    data,
    timestamp: Date.now()
  };

  res.json({message: 'Event stored successfully.'});
});

//Listen to GET request to fetch events data
app.get('/events', (req, res) => {
  res.json(events);
});

app.listen(3000);