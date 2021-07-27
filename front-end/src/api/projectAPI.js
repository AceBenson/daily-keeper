const axios = require('axios');

export const create_project = async (data) => {
  return axios.post("/api/project/create", data)
    .then(response => response)
    .catch(error => console.log(`error: ${error}`));
}