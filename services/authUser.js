import Axios from './axios'

export default async function fetchAuthUser(Cookies, ctx) {
  const remember = Cookies(ctx)[process.env.NEXT_PUBLIC_API_TOKEN_NAME]
  try {
    if (remember) {
      Axios.defaults.headers.Authorization = `Bearer ${remember}`
      const { data } = await Axios(`/auth/user`)
      data.data.IsAuthourized = true
      return data.data
    }
    return {
      id: '',
      username: '',
      lastName: '',
      otherName: '',
      userType: '',
      IsAuthourized: false
    }
  } catch (error) {
    throw Error("Could not fetch the authenticated user!")
  }
}