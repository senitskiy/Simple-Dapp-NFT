import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors"
import { Client, Entity, Schema, Repository } from 'redis-om'

import redis from "redis"
let clientRedis = redis.createClient();

//In-memory storage to store events data
let events = {};
const url = process.env.REDIS_URL || "redis://localhost:6379"

// class Nft extends Entity {
//   toJSON() {
//     return {
//         id: this.entityId,
//         collection: this.collection,
//     }
//   }
// }

  // collection: 0x3D827EAFa0D298d9909672B9CC3Aa5Fb321359ed App.js:236
  // recipient: 0x265F176620fCD0AcBE38f4cC75B30007AB0A10c9 App.js:237
  // tokenId: 1 App.js:238
  // tokenURI:

// const nftSchema = new Schema(Nft, {
//   collection: { type: 'string' },
//   // recipient: { type: 'string' },
//   // tokenId: { type: 'string' }, //number
//   // tokenURI: { type: 'string' }
//   },
//   { dataStructure: 'JSON' }
// )


class Task extends Entity {
  toJSON() {
      return {
          id: this.entityId,
          name: this.name
      }
  }
}

const taskSchema = new Schema(Task, {
  name: {
      type: 'string'
  }
}, {
  dataStructure: 'JSON'
});

// class Task extends Entity {
//   toJSON() {
//       return {
//           id: this.entityId,
//           name: this.name,
//           complete: this.complete,

//       }
//   }
// }

// export const taskSchema = new Schema(Task, {
//   name: {
//       type: 'string'
//   },
//   complete: {
//       type: 'boolean'
//   }
// }, {
//   dataStructure: 'JSON'
// });

// const nftRepository = client.fetchRepository(nftSchema)


const app = express();

app.use(cors());

// app.use(bodyParser.json());
app.use(express.json())

const client = new Client()
await client.open(url)

// const nftRepository = new Repository(nftSchema, client);

// await nftRepository.dropIndex();
// await nftRepository.createIndex();

const taskRepository = new Repository(taskSchema, client);

await taskRepository.dropIndex();
await taskRepository.createIndex();

//Listen to POST request to store events
app.post('/events', async (req, res) => {
  // const {eventName, data} = req.body;

  // events[eventName] = {
  //   data,
  //   timestamp: Date.now()
  // };

//  const personRepository = client.fetchRepository(personSchema)
  

// let id = new Date().getTime().toString();

// clientRedis.set("collection", field1)//;("members", id, JSON.stringify(member))


const task = taskRepository.createEntity();

task.name = req.body.name;
// task.complete = false;
console.log(req.body.name)
task.id = await taskRepository.save(task);

res.send(task);


// const nft = nftRepository.createEntity();

// nft.collection = req.body.collection;
// // nft.complete = false;
// nft.id = await nftRepository.save(nft);

// res.send(nft);

// const nft = await nftRepository.createAndSave(req.body)
// const nft = await nftRepository.createAndSave(JSON.stringify(member)) 
  // client.set('nft', JSON.stringify(req.body));
  // res.send(nft)
  // console.log(JSON.stringify(req.body.collection))
  // // const resReq = req.body
  // console.log({nft})
  // console.log(nft.entityId)
  // console.log(req.body)

  
  // let body = '';
  // req.on('data', chunk => {
  //   body += chunk.toString();
  //   // console.log(chunk.toString())
  //   console.log(chunk.toString())
  // });

  // collection: 0x3D827EAFa0D298d9909672B9CC3Aa5Fb321359ed App.js:236
  // recipient: 0x265F176620fCD0AcBE38f4cC75B30007AB0A10c9 App.js:237
  // tokenId: 1 App.js:238
  // tokenURI:

  // res.json({message: `Event stored successfully. entityId: ${nft.entityId}`});
});

//Listen to GET request to fetch events data
app.get('/events', (req, res) => {
  res.json(events);
});

app.listen(3001);