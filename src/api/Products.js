import axios from "axios";

const show = async slug => {
  const response = await axios.get(`/products/${slug}`);

  return response;
};

const fetchProduct = async params => {
  const response = await axios.get("/products", { params });

  return response;
};

const productsApi = { show, fetchProduct };
export default productsApi;
