import { setTickets, setId } from '../redux/action'

export default class TicketsAPI {
  constructor() {
    this.url = 'https://aviasales-test-api.kata.academy/'
  }

  getSearchId = () => {
    return (dispatch) => {
      return fetch(`${this.url}search`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Ошибка при получении searchId')
          }
          return response.json()
        })
        .then((data) => {
          dispatch(setId(data.searchId))
          return data.searchId
        })
        .catch((error) => {
          throw new Error('Ошибка при получении searchId', `${error.toString()}`)
        })
    }
  }
  getTickets = (id) => {
    return (dispatch) => {
      return fetch(`${this.url}tickets?searchId=${id}`)
        .then((response) => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error('Server Error')
          }
        })
        .then((data) => {
          dispatch(setTickets(data))
          return data.stop
        })
        .catch((error) => {
          if (error.message === 'Server Error') {
            return false
          } else {
            throw new Error('Ошибка при получении билетов ')
          }
        })
    }
  }
}
