import axios from "../../axios/axios.js";

export async function getProducts() {
  //tableLoader.value = true;
  let products = [];
  axios
    .get("products")
    .then((response) => {
      products = response.data.data;
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
       //return products;
    });
    return products;
}