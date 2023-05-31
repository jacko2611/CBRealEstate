// import dotenv from 'dotenv';
import { CMSFilters } from '../../types/CMSFilters';
import { Properties } from './types';
import { CMSList } from '../../types/CMSList';

// dotenv.config();

const apiKey = "HTNVNFzeSt8BhVCHYqzqs2KmbSA8f9Ek21sQ5i5n";
const apiToken = "xacvbqkccanqijifwdninqwrmkfhktjucrabfayw";

fetch("https://ap-southeast-2.api.vaultre.com.au/api/v1.2/properties", {
  headers: {
    "Authorization": `Bearer ${apiToken}`,
    "X-Api-Key": apiKey
  }
})

window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
  'cmsload',
  (listInstances) => {
    console.log('cmsload Successfully loaded!');

  window.fsAttributes.push({
    'cmsfilter': async (filtersInstances: CMSFilters[]) => {
      const [filtersInstance] = filtersInstances;
      const { listInstance } = filtersInstance;
      const [firstItem] = listInstance.items;
      const itemTemplateElement = firstItem.element;

      const properties = await fetchProperties();

      listInstance.clearItems();

      const newProperties = properties.map((property) => createProperty(property, itemTemplateElement));

      await listInstance.addItems(newProperties);

      const filterTemplateElement = filtersInstance.form.querySelector<HTMLLabelElement>('[data-element="filter"]');
      if (!filterTemplateElement) return;

      const filtersWrapper = filterTemplateElement.parentElement;
      if (!filtersWrapper) return;

      const categories = collectCategories(properties);

      for (const category of categories) {
        const newFilter = createFilter(category, filterTemplateElement);
        if (!newFilter) continue;

        filtersWrapper.append(newFilter);
      }

      filtersInstance.storeFiltersData();
    },
  });
}]);

const fetchProperties = async () => {
  try {
    const response = await fetch('https://ap-southeast-2.api.vaultre.com.au/api/v1.2/');
    const data: Properties[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
};

const createProperty = (property: Properties, templateElement: HTMLDivElement) => {
  const newItem = templateElement.cloneNode(true) as HTMLDivElement;
  newItem.removeAttribute('hidden');

  const titleElement = newItem.querySelector<HTMLDivElement>('[data-element="title"]');
  if (titleElement) titleElement.textContent = property.displayAddress;

  const priceElement = newItem.querySelector<HTMLDivElement>('[data-element="price"]');
  if (priceElement) priceElement.textContent = property.price;

  const imageElement = newItem.querySelector<HTMLImageElement>('[data-element="image"]');
  if (imageElement) imageElement.src = property.photos[0];

  return newItem;
};

const collectCategories = (properties: Properties[]) => {
  const categories: Set<Properties['category']> = new Set();

  for (const { category } of properties) {
    categories.add(category);
  }

  return [...categories];
};

const createFilter = (category: Properties['category'], templateElement: HTMLLabelElement) => {
  const newFilter = templateElement.cloneNode(true) as HTMLLabelElement;

  const label = newFilter.querySelector<HTMLLabelElement>('[data-element="label"]');
  const radio = newFilter.querySelector<HTMLInputElement>('[data-element="radio"]');

  if (!label || !radio) return;
  
  label.textContent = category;
  radio.value = category;

  return newFilter;
};
