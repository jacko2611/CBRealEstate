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

// Index to store property IDs and positions
let propertyIndex = {};

// Fetch all properties and build the index
const fetchAllProperties = async () => {
  try {
    const response = await fetch(initialEndpoint, {
      headers: {
        "Authorization": `Bearer ${apiToken}`,
        "X-Api-Key": apiKey
      }
    });
    const data = await response.json();

    // Build the index if data is an array
    if (Array.isArray(data)) {
      propertyIndex = buildPropertyIndex(data);
    }

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
// Helper function to build the property index
const buildPropertyIndex = (data) => {
  const index = {};
  data.forEach((property, indexPosition) => {
    const id = property.id;
    index[id] = indexPosition;
  });
  return index;
};

// Fetch all properties and build the index on server startup
fetchAllProperties();

// Fetch all properties (including index)
app.get('/properties', async (req, res) => {
  try {
    const data = await fetchAllProperties();
    res.json({ data, index: propertyIndex });
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

// Fetch properties for lease
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

// Fetch available sale properties
app.get('/properties/residential/sale/available', async (req, res) => {
  try {
    const propertyEndpoint = `${baseUrl}/v1.2/properties/residential/sale/available`;
    const response = await fetch(propertyEndpoint, {
      headers: {
        "Authorization": `Bearer ${apiToken}`,
        "X-Api-Key": apiKey
      }
    });
    const data = await response.json();

    if (Array.isArray(data)) {
      // Filter the JSON response to include only the desired properties
      const filteredData = data.map(property => ({
        photos: property.photos,
        id: property.tenureOrTitleType.id,
        displayAddress: property.address ? `${property.address.streetNumber} ${property.address.street}, ${property.address.suburb.name} ${property.address.state.abbreviation} ${property.address.postcode}` : "",
        bedrooms: property.bed,
        bathrooms: property.bath,
        description: property.description
      }));

      res.json(filteredData);
    } else {
      console.error("Unexpected data format from API:", data);
      res.status(500).json({ message: "An error occurred while fetching the properties." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching the properties." });
  }
});


// Fetch available lease properties
app.get('/properties/residential/lease/available', async (req, res) => {
  try {
    const propertyEndpoint = `${baseUrl}/v1.2/properties/residential/lease/available`;
    const reponse = await fetch(propertyEndpoint, {
      headers: {
        "Authorization": `Bearer ${apiToken}`,
        "X-Api-Key": apiKey
      }
    });
    const data = await reponse.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching the properties." });
  }
});

// Fetch available sale properties by id
app.get('/properties/residential/sale/available/:id', async (req, res) => {
  try {
    const propertyEndpoint = `${baseUrl}/v1.2/properties/residential/sale/available/${id}`;
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

// Fetch available lease properties by id
app.get('/properties/residential/lease/available/:id', async (req, res) => {
  try {
    const propertyEndpoint = `${baseUrl}/v1.2/properties/residential/lease/available/${id}`;
    const reponse = await fetch(propertyEndpoint, {
      headers: {
        "Authorization": `Bearer ${apiToken}`,
        "X-Api-Key": apiKey
      }
    });
    const data = await reponse.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching the properties." });
  }
});

// Fetch available properties for sale `published on portals`
app.get('/properties/residential/sale?publishedOnPortals=41591', async (req, res) => {
  try {
    const propertyEndpoint =  `${baseUrl}/v1.3/properties/residential/sale?publishedOnPortals=41591`;
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

// Fetch available properties for lease `published on portals`
app.get('/properties/residential/lease?publishedOnPortals=41591', async (req, res) => {
  try {
    const propertyEndpoint = `${baseUrl}/v1.3/properties/residential/lease?publishedOnPortals=41591`;
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



// Fetch properties for sale by ID
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
    res.json(propertyInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching the property details." });
  }
});

// Fetch properties for lease by ID
app.get('/properties/residential/lease/:id', async (req, res) => {
  try {
    const propertyId = req.params.id;
    const propertyEndpoint = `${baseUrl}/v1.2/properties/residential/lease/${propertyId}`;

    const response = await fetch(propertyEndpoint, {
      headers: {
        "Authorization": `Bearer ${apiToken}`,
        "X-Api-Key": apiKey
      }
    });

    const propertyInfo = await response.json();
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
