import axios from 'axios';
import config from '../../config';
export const getCategoriesAndDocuments = async () => {
  let categoryMap = {};
  try {
    const response = await axios.get(config.productDetailsApiUrl);
    const productCategories = new Set(response.data.map(product => product.productCategory));
    const categories = [...productCategories];
    categoryMap = response.data.reduce((acc, curr) => {
      if (categories.includes(curr.productCategory)) {
        const category = curr.productCategory.toLowerCase();
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push({
          id: curr.id,
          name: curr.productName,
          imageUrl: curr.productImageUrl,
          price: curr.productPrice
        });
      }
      return acc;
    }, {});
  }
  catch (error) {
    console.log(error);
  }
  return categoryMap;
};