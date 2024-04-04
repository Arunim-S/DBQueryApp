// fetchDatabase.js
import axios from 'axios';

const fetchDatabase = async (setDatabases) => {
  try {
    const response = await axios.get('https://text2nosqlserver.azurewebsites.net/api/databases');
    setDatabases(response.data);
  } catch (error) {
    console.error('Error fetching databases:', error);
  }
};

export default fetchDatabase;
