const fetchAllProperties = async () => {
    try {
      const response = await fetch("https://realestateserver-fuhd.onrender.com/properties");
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Error fetching properties');
      return [];
    }
  };
  
  const fetchSaleProperties = async () => {
    try {
      const response = await fetch("https://realestateserver-fuhd.onrender.com/properties/residential/sale");
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Error fetching sale properties');
      return [];
    }
  };
  
  const fetchSalePropertiesById = async (id) => {
    try {
      const response = await fetch(`https://realestateserver-fuhd.onrender.com/properties/residential/sale/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Error fetching the sale property');
      return null;
    }
  };
  
  const createProperty = async () => {
    const templateElement = document.getElementById('card-container');
    const propertyId = 19218806;
  
    try {
      const property = await fetchSalePropertiesById(propertyId);
      if (!property) {
        console.log('Property not found');
        return;
      }
  
      const newItem = templateElement.cloneNode(true);
      newItem.removeAttribute('hidden');
  
      // Set property data
      const titleElement = document.getElementById('address');
      if (titleElement) {
        titleElement.textContent = property.displayAddress;
      }
  
      const priceElement = document.getElementById('price');
      if (priceElement) {
        priceElement.textContent = property.salePrice;
      }
  
      const bedElement = document.getElementById('bedroom');
      if (bedElement) {
        bedElement.textContent = property.bed;
      }
  
      const bathElement = document.getElementById('bathroom');
      if (bathElement) {
        bathElement.textContent = property.bath;
      }
  
      const imageElement = document.getElementById('image');
      if (imageElement) {
        const primaryPhoto = property.photos.find((photo) => photo.isPrimary);
        if (primaryPhoto) {
          imageElement.src = primaryPhoto.url;
          imageElement.alt = primaryPhoto.description;
        }
      }
  
      // Add event listener to show description
      newItem.addEventListener('click', () => {
        const descriptionElement = newItem.querySelector('#description');
        if (descriptionElement) {
          descriptionElement.textContent = property.description;
        }
      });
  
      // Replace the existing listing-preview element with the new item
      templateElement.replaceWith(newItem);
    } catch (error) {
      console.log('Error creating property:', error);
    }
  };
  
  createProperty();
  