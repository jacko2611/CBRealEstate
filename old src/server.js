const express = require('express');
const cors = require('cors');
// const fetch = require('node-fetch');

const app = express();

app.use(cors());

app.get('/properties', async (req, res) => {
  const apiKey = "HTNVNFzeSt8BhVCHYqzqs2KmbSA8f9Ek21sQ5i5n";
  const apiToken = "xacvbqkccanqijifwdninqwrmkfhktjucrabfayw";
  
  try {
    const response = await fetch("https://ap-southeast-2.api.vaultre.com.au/api/v1.2/properties", {
      headers: {
        "Authorization": `Bearer ${apiToken}`,
        "X-Api-Key": apiKey
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching the properties." });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
