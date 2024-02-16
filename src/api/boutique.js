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


	// Toutes les boutiques
export function getAllBoutiques(data) {
  //console.log("getAllBoutiques", data)
  return axios.get(config.api_url+'/api/etikette/boutique/all', data)
  .then((res)=>{
      //console.log("res.data", res.data.boutiques)
      return res.data.boutiques
  })
  .catch((err)=>{
      return err 
  })
} 

	// Boutique par id
export function getOneBoutique(id) {
  //console.log("getOneBoutique", id)
  return axios.get(`${config.api_url}/api/etikette/boutique/one/${id}`, id)
  .then((res)=>{
      //console.log("res.data", res.data.boutiques)
      return res.data.boutiques
  })
  .catch((err)=>{
      return err 
  })
} 


	// Récupérer la disposition de l'étikette
export function getCoordEtikette(id_boutique) {
  console.log("yyyyyyyyyyyyyyyyyyyyy", id_boutique)
  return axios.get(`${config.api_url}/api/etikette/boutique/coord/${id_boutique}`, id_boutique)
  .then((res)=>{
      console.log("res.data", res.data.boutiques)
      return res.data.boutiques
  })
  .catch((err)=>{
      return err 
  })
} 


