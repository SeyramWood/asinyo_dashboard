import Axios from "./axios";

export async function fetchProductCatMajors() {
  try {
    const { data } = await Axios(`/products/category/major`);
    return data.data ?? [];
  } catch (error) {
    console.log(error);

    throw Error("Could not fetch products category majors!");
  }
}
