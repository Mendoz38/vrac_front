import axios from "axios";
import { config } from "../config"
// recupérer le token avec getItem
const token = window.localStorage.getItem('VN_token')

export const addBoutique = (data) => {
  console.log("addBoutique", data)
  return axios.post(`${config.api_url}/api/etikette/boutique/add`, data)
  .then((res)=>{
    console.log("res.msg", res.msg)
    return res.data
})
    .catch((err) =>{
      console.log("err.msg", err)
      return err

    })
};

