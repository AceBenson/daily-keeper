const axios = require('axios');

export const create_project = async (data) => {
  return axios.post("/api/project/create", data)
    .then(response => response)
    .catch(error => console.log(`error: ${error}`));
}

export const read_projects = async () => {
  return axios.get("/api/projects")
    .then(response => response)
    .catch(error => console.log(`error: ${error}`));
}

export const read_project_detail = async (_id) => {
  return axios.get("/api/project/"+_id)
    .then(response => response)
    .catch(error => console.log(`error: ${error}`));
}

export const update_project = async (_id, data) => {
  return axios.post("/api/project/"+_id+"/update", data)
    .then(response => response)
    .catch(error => console.log(`error: ${error}`));
}

export const delete_project = async (_id) => {
  return axios.post("/api/project/"+_id+"/delete")
    .then(response => response)
    .catch(error => console.log(`error: ${error}`));
}