import {instance} from './config'
import {Requests} from '../enum'

export const userAPI = {
  authUser: (data, callback) =>
    instance
      .post(Requests.SignUp, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        if (res.status === 200) {
          callback(res)
        }
      })
      .catch(e => {
        console.warn(e.response.data.detail.map(el => `Errors: ${el.msg}`).join('\n'))
      }),
  signIn: data =>
    instance
      .post(Requests.SignIn, data)
      .then(res => {
        if (res.status === 200) {
          return res
        }
      })
      .catch(e => {
        alert(e.response.data.detail)
      }),
  me: async token =>
    await instance.get(Requests.Me, {
      headers: {
        Authorization: token,
      },
    })
}
