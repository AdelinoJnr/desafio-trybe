import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';

const DBServer = new MongoMemoryServer();
const OPTIONS: object = { useNewUrlParser: true, useUnifiedTopology: true };

const getConnection = async () => {
  const URLMock = await DBServer.getUri();
  return MongoClient.connect(URLMock, OPTIONS);
};

export default getConnection;
