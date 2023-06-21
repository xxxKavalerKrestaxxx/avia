export default class TicketsAPI {
  constructor() {
    this.url = 'https://aviasales-test-api.kata.academy/'
  }

  getSearchId = () => {
    return fetch(`${this.url}search`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка при получении searchId')
        }
        return response.json()
      })
      .then((data) => {
        return data.searchId
      })
      .catch((error) => {
        throw new Error('Ошибка при получении searchId', `${error.toString()}`)
      })
  }

  getTickets = (id) => {
    return fetch(`${this.url}tickets?searchId=${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
      })
      .then((data) => {
        return data
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
