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

  console.log({data})

  // collection: 0x3D827EAFa0D298d9909672B9CC3Aa5Fb321359ed App.js:236
  // recipient: 0x265F176620fCD0AcBE38f4cC75B30007AB0A10c9 App.js:237
  // tokenId: 1 App.js:238
  // tokenURI:

  res.json({message: 'Event stored successfully.'});
});

//Listen to GET request to fetch events data
app.get('/events', (req, res) => {
  res.json(events);
});

app.listen(3001);