const fetchSaleProperties = async () => {
  try {
    const response = await fetch("https://realestateserver-fuhd.onrender.com/properties/residential/sale/available");
    const data = await response.json();
    return data.items; 
  } catch (error) {
    console.log('Error fetching sale properties');
    return [];
  }
};

const createPropertyCards = async () => {
  try {
    const properties = await fetchSaleProperties();

    if (!Array.isArray(properties)) {
      console.log('Invalid response format');
      return;
    }

    const templateElement = document.getElementById('card-container');
    const containerElement = templateElement.parentElement;

    for (const property of properties) {
      try {
        const newItem = templateElement.cloneNode(true);
        newItem.removeAttribute('hidden');

        const titleElement = newItem.querySelector('#address');
        if (titleElement) {
          titleElement.textContent = property.displayAddress;
        }

        const priceElement = newItem.querySelector('#price');
        if (priceElement) {
          priceElement.textContent = property.searchPrice;
        }

        const bedElement = newItem.querySelector('#bedroom');
        if (bedElement) {
          bedElement.textContent = property.bed;
        }

        const bathElement = newItem.querySelector('#bathroom');
        if (bathElement) {
          bathElement.textContent = property.bath;
        }

        const imageElement = newItem.querySelector('#image');
        if (imageElement) {
          const primaryPhoto = property.photos[0];
          if (primaryPhoto) {
            imageElement.src = primaryPhoto.url;
            imageElement.alt = primaryPhoto.description;
          }
        }

        // Add event listener to capture property ID and navigate to the URL
        newItem.addEventListener('click', () => {
  const propertyId = property.id; // Update propertyId to property.id
  console.log('Clicked Property ID:', propertyId);
  // Perform the window location change to the desired URL
  window.location.href = `https://www.carabergmannproperties.au/sale?id=${propertyId}`;
});

        containerElement.appendChild(newItem);
      } catch (error) {
        console.log(`Error creating property card:`, error);
      }
    }
  } catch (error) {
    console.log('Error creating property cards:', error);
  }
};

createPropertyCards();
