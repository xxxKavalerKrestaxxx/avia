export default class TicketsAPI {
  constructor() {
    this.url = 'https://aviasales-test-api.kata.academy/'
  }

  getSearchId = () => {
    return fetch(`${this.url}search`)
      .then((response) => response.json())
      .then((data) => {
        return data.searchId
      })
      .catch((error) => {
        console.log(error)
      })
  }
  getTickets = (id) => {
    return fetch(`${this.url}tickets?searchId=${id}`)
      .then((response) => response.json())
      .then((data) => {
        return data
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
