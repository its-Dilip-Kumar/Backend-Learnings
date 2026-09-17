// const url='mongodb+srv://dilipsharma6148_db_user:LWeSqEYq86aELzQg@codingadda.ymtafbp.mongodb.net/'

const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = '';
const client = new MongoClient(url);

// Database Name
const dbName = 'CodingAdda';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('documents');

  // the following code examples can be pasted here...

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());