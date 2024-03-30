import express from 'express';
import bodyParser from 'body-parser';
import { CosmosClient } from '@azure/cosmos';
import bcrypt from 'bcrypt';
import cors from "cors"
const app = express();
const PORT = process.env.PORT || 3001;
// Initialize Cosmos DB client
const connection_string =
  "AccountEndpoint=https://testafschatdb.documents.azure.com:443/;AccountKey=uq6mIAbz6sAlXEuj3ieWHnnyvu7qRI9SrL1D3zba98r45qDVZum10wwgefDFL6fi13AdBQe36Zd1ACDbxSTvkg==;";
const clientCosmos = new CosmosClient(connection_string);
const database = clientCosmos.database("Testing_Purpose");

app.use(bodyParser.json());
app.use(cors());

// Function to list all databases
async function listDatabases(req, res) {
  try {
      const { resources: databases } = await clientCosmos.databases.readAll().fetchAll();
      const databaseNames = databases.map(database => database.id);
      res.json(databaseNames);
  } catch (error) {
      console.error('Error listing databases:', error);
      res.status(500).json({ error: 'Error listing databases' });
  }
}

// User login route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const { resources } = await container.items.readAll().fetchAll();
    if (resources.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const user = resources.find((e) => e.userName === username);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // let pass = "123456789";
    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, pass);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    // Authentication successful
    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to create a database
app.post('/api/createdb', async (req, res) => {
  try {
    // Create database
    const { statusCode, database } = await clientCosmos.databases.createIfNotExists({ id: req.body.name });
    console.log(database)
    res.status(200).json({ message: 'Database created successfully', statusCode: statusCode });
  } catch (error) {
    console.error('Database creation failed:', error);
    res.status(500).json({ error: error });
  }
});

// Endpoint to delete a database
app.delete('/api/deletedb', async (req, res) => {
  try {
    console.log("hi")
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'Database ID is required in the request body' });
    }

    const databaseResponse = await clientCosmos.database(id).delete();
    const statusCode = databaseResponse.statusCode;
    res.status(200).json({ message: `Database '${id}' deleted successfully.`, statusCode });
  } catch (error) {
    console.error('Database deletion failed:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to list containers present in the database
app.get('/api/listcontainers', async (req, res) => {
  try {
    const {name} = req.body;
    const database_cl = clientCosmos.database(name);
    const { resources_cl } = await database_cl.containers.readAll().fetchAll();
    const containerIds = resources_cl.map(container => container.id);
    res.status(200).json({ containers: containerIds });
  } catch (error) {
    console.error('Failed to list containers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define API endpoint
app.get('/api/databases', listDatabases);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
