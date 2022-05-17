import { post } from './api'

export class AuthService {
  static login(data) {
    return post(`${process.env.REACT_APP_API_URL}auth/login`, data)
  }
}
