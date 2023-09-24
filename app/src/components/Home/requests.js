const API_KEY = 'AIzaSyC1D8WIkBINjc6GWc63579oia1BGoNYFcc';

const requests = {
  fetchmostpopular: `https://www.googleapis.com/books/v1/volumes?q=mostpopular&maxResults=40&orderBy=newest&key=${API_KEY}`,
  fetchfantasy: `https://www.googleapis.com/books/v1/volumes?q=fantasy&maxResults=40&orderBy=newest&key=${API_KEY}`,
  fetchromance: `https://www.googleapis.com/books/v1/volumes?q=romance&maxResults=40&orderBy=newest&key=${API_KEY}`,
  fetchpoetry: `https://www.googleapis.com/books/v1/volumes?q=poetry&maxResults=40&orderBy=newest&key=${API_KEY}`,
  fetchflower: `https://www.googleapis.com/books/v1/volumes?q=flower&maxResults=40&orderBy=newest&key=${API_KEY}`
  
};

export default requests;