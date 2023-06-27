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
  
  const displayPropertyDetails = async () => {
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
          newItem.style.display = 'block'; // Show the cloned element
  
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
  
          const headingElement = newItem.querySelector('#heading');
          if (headingElement) {
            headingElement.textContent = property.heading;
          }
  
          const descriptionElement = newItem.querySelector('#description');
          if (descriptionElement) {
            descriptionElement.textContent = property.description;
          }
  
          const imageElement = newItem.querySelector('#image');
          if (imageElement) {
            const primaryPhoto = property.photos[0];
            if (primaryPhoto) {
              imageElement.src = primaryPhoto.url;
              imageElement.alt = primaryPhoto.description;
            }
          }
  
          containerElement.appendChild(newItem);
        } catch (error) {
          console.log(`Error creating property card:`, error);
        }
      }
  
      templateElement.style.display = 'none'; // Hide the template element after cloning
    } catch (error) {
      console.log('Error creating property cards:', error);
    }
  };
  
  
  (async () => {
    await fetchSaleProperties();
    displayPropertyDetails();
  })();
  