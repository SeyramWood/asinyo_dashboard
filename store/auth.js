import { atom } from 'jotai'

const authUser = atom({
  id: '',
  username: '',
  lastName: '',
  otherName: '',
  userType: '',
  IsAuthourized: false
})
const authToken = atom("")

export { authUser, authToken }