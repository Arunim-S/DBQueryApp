// fetchContainers.js
import axios from 'axios';

const fetchContainers = async (databases, selector, setContainers) => {
  try {
    const databaseName = databases.length > 0 ? databases[selector] : '';
    const response = await axios.get('https://text2nosqlserver.azurewebsites.net/api/listcontainers', { params: { name: databaseName }});
    setContainers(response.data.containers);
  } catch (error) {
    console.error('Error fetching containers:', error);
  }
};

export default fetchContainers;
