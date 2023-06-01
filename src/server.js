const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');


dotenv.config();

const app = express();
const apiToken = process.env.API_TOKEN;
const apiKey = process.env.API_KEY;

app.use(cors());

const baseUrl = "https://ap-southeast-2.api.vaultre.com.au/api";
const initialEndpoint = `${baseUrl}/v1.2/properties`;


// Fetch all properties
app.get('/properties', async (req, res) => {
  try {
    const response = await fetch(initialEndpoint, {
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

// Fetch properties for sale
app.get('/properties/residential/sale', async (req, res) => {
  try {
    const propertyEndpoint = `${baseUrl}/v1.2/properties/residential/sale`;
    const response = await fetch(propertyEndpoint, {
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

// Fetch properties for rent
app.get('/properties/residential/lease', async (req, res) => {
  try {
    const propertyEndpoint = `${baseUrl}/v1.2/properties/residential/lease`;
    const response = await fetch(propertyEndpoint, {
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

//Fetch properties for sale by id
app.get('/properties/residential/sale/:id', async (req, res) => {
  try {
    const propertyId = req.params.id;
    const propertyEndpoint = `${baseUrl}/v1.2/properties/residential/sale/${propertyId}`;
    
    const response = await fetch(propertyEndpoint, {
      headers: {
        "Authorization": `Bearer ${apiToken}`,
        "X-Api-Key": apiKey
      }
    });

    const propertyInfo = await response.json();
    // Process propertyInfo and send the necessary data in the response
    res.json(propertyInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching the property details." });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
