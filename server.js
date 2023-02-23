import express from 'express';
import cors from 'cors';
import {Client, Repository} from "redis-om";
import {nftSchema} from "./schema/task.schema.js";

const app = express();
app.use(express.json());
app.use(cors(
    {
//         Origin: ['http://localhost:3000']
//     // origin: ['http://localhost:3000']f
// "Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT"
"Access-Control-Allow-Methods": "GET, OPTIONS, POST, PUT"
}
));


const client = new Client();
await client.open("redis://localhost:6379")

const nftRepository = new Repository(nftSchema, client);

await nftRepository.dropIndex();
await nftRepository.createIndex();

app.get('/events', async (req, res) => {
    res.send(await nftRepository.search().returnAll());
});

app.post('/events', async (req, res) => {
    const nft = nftRepository.createEntity();
    // console.log({req})
    // task.name = req.body.name;
    // task.complete = false;
    const fd = req.body
    console.log({fd})

    nft.collection = req.body.data.collection,
    nft.recipient  = req.body.data.recipient,
    nft.tokenId    = req.body.data.tokenId,
    nft.tokenURI   = req.body.data.tokenURI   

    nft.id = await nftRepository.save(nft);

    // console.log({nft})
    res.send(nft);
});

app.put('/events/:id', async (req, res) => {
    const nft = await nftRepository.fetch(req.params.id);



    nft.collection = req.body.collection,
    nft.recipient  = req.body.recipient,
    nft.tokenId    = req.body.tokenId,
    nft.tokenURI   = req.body.tokenURI   

    await nftRepository.save(nft);

    res.send(nft);
});

app.delete('/events/:id', async (req, res) => {
    await nftRepository.remove(req.params.id);

    res.send(null);
});

app.listen(3001);
