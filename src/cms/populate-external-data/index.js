// const fetchSaleProperties = async () => {
//     try {
//       const response = await fetch("https://realestateserver-fuhd.onrender.com/properties/residential/sale");
//       const data = await response.json();
//       return data.items; 
//     } catch (error) {
//       console.log('Error fetching sale properties');
//       return [];
//     }
//   };
  
//   const fetchSalePropertiesById = async (id) => {
//     try {
//       const response = await fetch(`https://realestateserver-fuhd.onrender.com/properties/residential/sale/${id}`);
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.log('Error fetching the sale property');
//       return null;
//     }
//   };
  
//   const createPropertyCards = async () => {
//     try {
//       const properties = await fetchSaleProperties();
  
//       if (!Array.isArray(properties)) {
//         console.log('Invalid response format');
//         return;
//       }
  
//       const templateElement = document.getElementById('card-container');
//       const containerElement = templateElement.parentElement;
  
//       for (const property of properties) {
//         try {
//           const propertyData = await fetchSalePropertiesById(property.id);
  
//           if (!propertyData) {
//             console.log(`Property with ID ${property.id} not found`);
//             continue;
//           }
  
//           const newItem = templateElement.cloneNode(true);
//           newItem.removeAttribute('hidden');
  
        
//           const titleElement = newItem.querySelector('#address');
//           if (titleElement) {
//             titleElement.textContent = propertyData.displayAddress;
//           }
  
//           const priceElement = newItem.querySelector('#price');
//           if (priceElement) {
//             priceElement.textContent = propertyData.salePrice;
//           }
  
//           const bedElement = newItem.querySelector('#bedroom');
//           if (bedElement) {
//             bedElement.textContent = propertyData.bed;
//           }
  
//           const bathElement = newItem.querySelector('#bathroom');
//           if (bathElement) {
//             bathElement.textContent = propertyData.bath;
//           }
  
//           const imageElement = newItem.querySelector('#image');
//           if (imageElement) {
//             const primaryPhoto = propertyData.photos.find((photo) => photo.isPrimary);
//             if (primaryPhoto) {
//               imageElement.src = primaryPhoto.url;
//               imageElement.alt = primaryPhoto.description;
//             }
//           }
  
          
//           newItem.addEventListener('click', () => {
//             const descriptionElement = newItem.querySelector('#description');
//             if (descriptionElement) {
//               descriptionElement.textContent = propertyData.description;
//             }
//           });
  
         
//           containerElement.appendChild(newItem);
//         } catch (error) {
//           console.log(`Error creating property card for ID ${property.id}:`, error);
//         }
//       }
//     } catch (error) {
//       console.log('Error creating property cards:', error);
//     }
//   };
  
//   createPropertyCards();















const fetchSaleProperties = async () => {
  try {
    const response = await fetch("https://realestateserver-fuhd.onrender.com/properties/residential/sale");
    const data = await response.json();
    return data.items; 
  } catch (error) {
    console.log('Error fetching sale properties');
    return [];
  }
};

const fetchSalePropertiesById = async (id) => {
  try {
    const response = await fetch(`https://realestateserver-fuhd.onrender.com/properties/residential/sale/available`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching the sale property');
    return null;
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
        const propertyData = await fetchSalePropertiesById(property.id);

        if (!propertyData) {
          console.log(`Property with ID ${property.id} not found`);
          continue;
        }

        const newItem = templateElement.cloneNode(true);
        newItem.removeAttribute('hidden');

      
        const titleElement = newItem.querySelector('#address');
        if (titleElement) {
          titleElement.textContent = propertyData.displayAddress;
        }

        const priceElement = newItem.querySelector('#price');
        if (priceElement) {
          priceElement.textContent = propertyData.salePrice;
        }

        const bedElement = newItem.querySelector('#bedroom');
        if (bedElement) {
          bedElement.textContent = propertyData.bed;
        }

        const bathElement = newItem.querySelector('#bathroom');
        if (bathElement) {
          bathElement.textContent = propertyData.bath;
        }

        const imageElement = newItem.querySelector('#image');
        if (imageElement) {
          const primaryPhoto = propertyData.photos.find((photo) => photo.isPrimary);
          if (primaryPhoto) {
            imageElement.src = primaryPhoto.url;
            imageElement.alt = primaryPhoto.description;
          }
        }

        
        newItem.addEventListener('click', () => {
          const descriptionElement = newItem.querySelector('#description');
          if (descriptionElement) {
            descriptionElement.textContent = propertyData.description;
          }
        });

       
        containerElement.appendChild(newItem);
      } catch (error) {
        console.log(`Error creating property card for ID ${property.id}:`, error);
      }
    }
  } catch (error) {
    console.log('Error creating property cards:', error);
  }
};

createPropertyCards();