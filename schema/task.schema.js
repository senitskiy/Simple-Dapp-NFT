import {Entity, Schema} from "redis-om";

// class Task extends Entity {
//     toJSON() {
//         return {
//             id: this.entityId,
//             name: this.name
//             // complete: this.complete
//         }
//     }
// }


class Nft extends Entity {
  toJSON() {
    return {
        id: this.entityId,
        collection: this.collection,
        recipient: this.recipient,
        tokenId: this.tokenId,
        tokenURI: this.tokenURI     
    }
  }
}

  // collection: 0x3D827EAFa0D298d9909672B9CC3Aa5Fb321359ed App.js:236
  // recipient: 0x265F176620fCD0AcBE38f4cC75B30007AB0A10c9 App.js:237
  // tokenId: 1 App.js:238
  // tokenURI:

export const nftSchema = new Schema(Nft, {
  collection: { type: 'string' },
  recipient: { type: 'string' },
  tokenId: { type: 'number' }, //number
  tokenURI: { type: 'string' }
  },
  { dataStructure: 'JSON' }
)
// export const taskSchema = new Schema(Task, {
//     name: {
//         type: 'string'
//     }
//     // complete: {
//     //     type: 'boolean'
//     // }
// }, {
//     dataStructure: 'JSON'
// });
