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
    const titleElement = newItem.querySelector('[data-element="address"]');
    if (titleElement)
      titleElement.textContent = property.displayAddress;
    const priceElement = newItem.querySelector('[data-element="price"]');
    if (priceElement)
      priceElement.textContent = property.salePrice;
    const bedElement = newItem.querySelector('[data-element="bed"]');
    if (bedElement)
      bedElement.textContent = property.bed;
    const bathElement = newItem.querySelector('[data-element="bath"]');
    if (bathElement)
      bathElement.textContent = property.bath;
    const imageElement = newItem.querySelector('[data-element="image"]');
    if (imageElement) {
      const primaryPhoto = property.photos.find((photo) => photo.isPrimary);
      if (primaryPhoto) {
        imageElement.src = primaryPhoto.url;
        imageElement.alt = primaryPhoto.description;
      }
    }
    return newItem;
  };
  
  
  // Example usage
  const listInstance = document.querySelector('[data-instance="list"]');
  const itemTemplateElement = listInstance?.querySelector('[data-element="item"]');
  if (!listInstance || !itemTemplateElement) {
    console.log('List instance or item template element not found');
  } else {
    fetchAllProperties().then(properties => {
      const newProperties = properties.map((property) => createProperty(property, itemTemplateElement));
      listInstance.innerHTML = '';
      listInstance.append(...newProperties);
    });
  }
  
  
  const collectCategories = (properties) => {
    const categories = new Set();
    for (const { category } of properties) {
      categories.add(category);
    }
    return [...categories];
  };
  
//   const createFilter = (category, templateElement) => {
//     const newFilter = templateElement.cloneNode(true);
//     const label = newFilter.querySelector('[data-element="label"]');
//     const radio = newFilter.querySelector('[data-element="radio"]');
//     if (!label || !radio)
//       return;
//     label.textContent = category;
//     radio.value = category;
//     return newFilter;
//   };
  
  window.addEventListener('DOMContentLoaded', () => {
    const listInstance = document.querySelector('[data-instance="list"]');
    const itemTemplateElement = listInstance?.querySelector('[data-element="item"]');
    if (!listInstance || !itemTemplateElement) {
      console.log('List instance or item template element not found');
      return;
    }
  
    fetchProperties().then(properties => {
      console.log({ properties });
      const newProperties = properties.map((property) => createProperty(property, itemTemplateElement));
      listInstance.innerHTML = '';
      listInstance.append(...newProperties);
  
      const filterInstances = document.querySelectorAll('[data-instance="filter"]');
      for (const filtersInstance of filterInstances) {
        const filterTemplateElement = filtersInstance.querySelector('[data-element="filter"]');
        if (!filterTemplateElement) {
          console.log('Filter template element not found');
          continue;
        }
        const filtersWrapper = filterTemplateElement.parentElement;
        if (!filtersWrapper)
          continue;
        const categories = collectCategories(properties);
        for (const category of categories) {
          const newFilter = createFilter(category, filterTemplateElement);
          if (!newFilter)
            continue;
          filtersWrapper.append(newFilter);
        }
      }
    });
  });
  