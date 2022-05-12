import Axios from './axios'

export async function fetchProductCatMajors() {
  try {
    const { data } = await Axios(`/products/majors`)
    return data.data

  } catch (error) {
    throw Error("Could not fetch products category majors!")
  }
}