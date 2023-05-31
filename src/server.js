const dotenv = require ('dotenv');

const express = require('express');
const cors = require('cors');
// const fetch = require('node-fetch');
dotenv.config();

const app = express();

const apiToken = process.env.API_TOKEN;
const apiKey = process.env.API_KEY;

app.use(cors());

app.get('/properties', async (req, res) => {

  try {
    const response = await fetch("https://ap-southeast-2.api.vaultre.com.au/api/v1.2/properties", {
      headers: {
        "Authorization": `Bearer ${apiToken}`,
        "X-Api-Key": apiKey
      }
    });
    console.log({ apiKey, apiToken });
    

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
