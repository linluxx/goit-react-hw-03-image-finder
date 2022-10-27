import axios from 'axios';

const KEY = '29800147-042a8c86586ab835e1f8a2965';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const SEARCH_PARAMS =
  'image_type=photo&orientation=horizontal&safesearch=true&per_page=12';

export const getData = async (query, page, showLoader, hideLoader) => {
  try {
    showLoader();
    const response = await axios.get(
      `?key=${KEY}&q=${query}&${SEARCH_PARAMS}&page=${page}`
    );
    hideLoader();
    return response.data.hits;
  } catch (error) {
    console.error(error);
  } finally {
    hideLoader();
  }
};
