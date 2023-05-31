var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fetchProperties = async () => {
    try {
      const response = await fetch("https://realestateserver-fuhd.onrender.com/properties");
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Error fetching properties');
      return [];
    }
  };
  
  window.fsAttributes = window.fsAttributes || [];
  
  window.fsAttributes.push({
    'cmsload': (listInstances) => {
      console.log('cmsload Successfully loaded!');
      console.log('cmsfilter Successfully loaded!');
      const [filtersInstance] = listInstances;
      const { listInstance } = filtersInstance;
      const [firstItem] = listInstance.items;
      const itemTemplateElement = firstItem.element;
      fetchProperties().then(properties => {
        console.log({ properties });
        listInstance.clearItems();
        const newProperties = properties.map((property) => createProperty(property, itemTemplateElement));
        listInstance.addItems(newProperties);
        const filterTemplateElement = filtersInstance.form.querySelector('[data-element="filter"]');
        if (!filterTemplateElement) {
          console.log('filterTemplateElement not found');
          return;
        }
        const filtersWrapper = filterTemplateElement.parentElement;
        if (!filtersWrapper)
          return;
        const categories = collectCategories(properties);
        for (const category of categories) {
          const newFilter = createFilter(category, filterTemplateElement);
          if (!newFilter)
            continue;
          filtersWrapper.append(newFilter);
        }
        filtersInstance.storeFiltersData();
      });
    },
    'cmsfilter': (filtersInstances) => {
      console.log('cmsfilter Successfully loaded!');
      const [filtersInstance] = filtersInstances;
      const { listInstance } = filtersInstance;
      const itemTemplateElement = listInstance.items?.[0]?.element;
      if (!itemTemplateElement) {
        console.log('Item template element not found');
        return;
      }
      fetchProperties().then(properties => {
        console.log({ properties });
        listInstance.clearItems();
        const newProperties = properties.map((property) => createProperty(property, itemTemplateElement));
        listInstance.addItems(newProperties);
        const filterTemplateElement = filtersInstance.form.querySelector('[data-element="filter"]');
        if (!filterTemplateElement) {
          console.log('filterTemplateElement not found');
          return;
        }
        const filtersWrapper = filterTemplateElement.parentElement;
        if (!filtersWrapper)
          return;
        const categories = collectCategories(properties);
        for (const category of categories) {
          const newFilter = createFilter(category, filterTemplateElement);
          if (!newFilter)
            continue;
          filtersWrapper.append(newFilter);
        }
        filtersInstance.storeFiltersData();
      });
    }
  });
  
  const createProperty = (property, templateElement) => {
    const newItem = templateElement.cloneNode(true);
    newItem.removeAttribute('hidden');
    const titleElement = newItem.querySelector('[data-element="address"]');
    if (titleElement)
      titleElement.textContent = property.displayAddress;
    const priceElement = newItem.querySelector('[data-element="price"]');
    if (priceElement)
      priceElement.textContent = property.salePrice;
    const imageElement = newItem.querySelector('[data-element="image"]');
    if (imageElement)
      imageElement.src = property.photos[0];
    return newItem;
  };
  
  const collectCategories = (properties) => {
    const categories = new Set();
    for (const { category } of properties) {
      categories.add(category);
    }
    return [...categories];
  };
  
  const createFilter = (category, templateElement) => {
    const newFilter = templateElement.cloneNode(true);
    const label = newFilter.querySelector('[data-element="label"]');
    const radio = newFilter.querySelector('[data-element="radio"]');
    if (!label || !radio)
      return;
    label.textContent = category;
    radio.value = category;
    return newFilter;
  };
  