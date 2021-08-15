const axios = require('axios');

export const read_workingitems = async () => {
  return axios.get("/api/workingitems")
    .then(response => response)
    .catch(error => {console.log(`error: ${error}`); return error.response;});
}

export const read_workingitems_filter_by_date = async (data) => {
  console.log(data);
  return axios.get("/api/workingitems/date", data)
    .then(response => response)
    .catch(error => {console.log(`error: ${error}`); return error.response;});
}

export const create_workingitem = async (data) => {
  return axios.post("/api/workingitem/create", data)
    .then(response => response)
    .catch(error => {console.log(`error: ${error}`); return error.response;});
}

export const update_workingitem = async (_id, data) => {
  return axios.post("/api/workingitem/"+_id+"/update", data)
    .then(response => response)
    .catch(error => {console.log(`error: ${error}`); return error.response;});
}

export const delete_workingitem = async (_id) => {
  return axios.post("/api/workingitem/"+_id+"/delete")
    .then(response => response)
    .catch(error => {console.log(`error: ${error}`); return error.response;});
}



