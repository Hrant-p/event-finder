import axios from 'axios';

export const request = (method, url, data, config) => axios({
  method, url, data, config
});
