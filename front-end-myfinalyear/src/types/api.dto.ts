export interface TouristInfo {
  id: number
  name: string
  description: string
  createdTime: Date
  modified: Date
  price: number
  quantity: number
  phone: number
  imageUrl: string
  lastedDate:Date
  address:string
  startDate:Date
  lastDate:Date
  status: boolean
  storeId: number
}
export interface User {
  userName: string
  hasPassword: string
  email: string
  phone: string
  sex: string
  firstName: string
  address: string
  DateOfBirth: Date
}