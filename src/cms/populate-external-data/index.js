var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
    'cmsload',
    (listInstances) => {
        console.log('cmsload Successfully loaded!');
    }
]);
window.fsAttributes.push({
    'cmsfilter': (filtersInstances) => __awaiter(void 0, void 0, void 0, function* () {
        const [filtersInstance] = filtersInstances;
        const { listInstance } = filtersInstance;
        const [firstItem] = listInstance.items;
        const itemTemplateElement = firstItem.element;
        const properties = yield fetchProperties();
        listInstance.clearItems();
        const newProperties = properties.map((property) => createProperty(property, itemTemplateElement));
        yield listInstance.addItems(newProperties);
        const filterTemplateElement = filtersInstance.form.querySelector('[data-element="filter"]');
        if (!filterTemplateElement)
            return;
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
    }),
});

// function fetchProperties() {
//     return __awaiter(this, void 0, void 0, function* () {
//       try {
//         var response = yield fetch('https://ap-southeast-2.api.vaultre.com.au/api/v1.3/properties', {
//           headers: {
//             "Authorization": "Bearer " + apiToken,
//             "X-Api-Key": apiKey
//           }
//         });
//         var data = yield response.json();
//         return data;
//       } catch (error) {
//         console.log('Error fetching properties', error);
//         return [];
//       }
//     });
//   }
  
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
export {};
