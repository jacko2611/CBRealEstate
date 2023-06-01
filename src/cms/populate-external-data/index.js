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
      console.log('Error fetching properties');
      return [];
    }
  };
  
  const fetchSalePropertiesById = async (id) => {
    try {
      const response = await fetch(`https://realestateserver-fuhd.onrender.com/properties/residential/sale/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Error fetching properties');
      return [];
    }
  };
  
  const fetchLeaseProperties = async () => {
    try {
      const response = await fetch("https://realestateserver-fuhd.onrender.com/properties/residential/lease");
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Error fetching properties');
      return [];
    }
  };
  
  const fetchLeasePropertiesById = async (id) => {
    try {
      const response = await fetch(`https://realestateserver-fuhd.onrender.com/properties/residential/lease/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Error fetching properties');
      return [];
    }
  };
  
  const createProperty = (property, templateElement) => {
    const newItem = templateElement.cloneNode(true);
    newItem.removeAttribute('hidden');
    
    // Set property data
    const titleElement = newItem.querySelector('[data-element="address"]');
    if (titleElement) {
      titleElement.textContent = property.displayAddress;
    }
    
    const priceElement = newItem.querySelector('[data-element="price"]');
    if (priceElement) {
      priceElement.textContent = property.salePrice;
    }
    
    const bedElement = newItem.querySelector('[data-element="bed"]');
    if (bedElement) {
      bedElement.textContent = property.bed;
    }
    
    const bathElement = newItem.querySelector('[data-element="bath"]');
    if (bathElement) {
      bathElement.textContent = property.bath;
    }
    
    const imageElement = newItem.querySelector('[data-element="image"]');
    if (imageElement) {
      const primaryPhoto = property.photos.find((photo) => photo.isPrimary);
      if (primaryPhoto) {
        imageElement.src = primaryPhoto.url;
        imageElement.alt = primaryPhoto.description;
      }
    }
  
    // Add event listener to show description
    newItem.addEventListener('click', () => {
      const descriptionElement = newItem.querySelector('[data-element="description"]');
      if (descriptionElement) {
        descriptionElement.textContent = property.description;
      }
    });
  
    return newItem;
  };
  
 
  