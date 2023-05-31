const apiKey = "HTNVNFzeSt8BhVCHYqzqs2KmbSA8f9Ek21sQ5i5n";
const apiToken = "xacvbqkccanqijifwdninqwrmkfhktjucrabfayw";

fetch("https://ap-southeast-2.api.vaultre.com.au/api/v1.3/properties/residential/sale/19218806 ", {
  headers: {
    "Authorization": `Bearer ${apiToken}`,
    "X-Api-Key": apiKey
  }
})
  .then(response => response.json())
  .then(data => {
    console.log(data); // Log the data to the console
  })
  .catch(error => {
    console.error(error); // Log any errors to the console
  });

  fetch('your_api_endpoint')
  .then(response => response.json())
  .then(data => {
    // Assuming the API response contains an array of properties
    const properties = data.properties;

    // Select the carousel slide elements
    const carouselSlides = document.querySelectorAll('.w-slide');

    // Loop through the carousel slides and update the content
    for (let i = 0; i < carouselSlides.length; i++) {
      const slide = carouselSlides[i];
      const property = properties[i];

      // Update the image source
      const imageElement = slide.querySelector('img');
      imageElement.src = property.imageSrc;

      // Update the property title
      const titleElement = slide.querySelector('.title');
      titleElement.textContent = property.title;

      // Update the property price
      const priceElement = slide.querySelector('.price');
      priceElement.textContent = property.price;

      // Update the property description
      const descriptionElement = slide.querySelector('.small-text');
      descriptionElement.textContent = property.description;
    }
  })
  .catch(error => {
    console.log('An error occurred:', error);
  });

  console.log(`hey josh`)



