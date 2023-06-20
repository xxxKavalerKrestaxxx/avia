import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './components/app/app'
import './index.css'

const initialState = {
  checkedList: ['Без пересадок ', '1 пересадка', '2 пересадки', '3 пересадки'],
  indeterminate: true,
  checkAll: true,
  menu: 'САМЫЙ ДЕШЕВЫЙ',
  stop: false,
  tickets: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CHECKED_LIST':
      var { checkedList } = action.payload
      return {
        ...state,
        checkedList,
        indeterminate: !!checkedList.length && checkedList.length < action.payload.plainOptions.length,
        checkAll: checkedList.length === action.payload.plainOptions.length,
      }
    case 'SET_CHECK_ALL':
      return {
        ...state,
        checkedList: action.payload ? action.payload.plainOptions : [],
        indeterminate: false,
        checkAll: action.payload,
      }
    case 'SET_MENU':
      return {
        ...state,
        menu: action.payload.menu,
        stop: action.payload.stop,
      }
    case 'SET_TICKETS': {
      const tickets = state.tickets.concat(action.payload.tickets)

      return {
        ...state,
        tickets,
      }
    }
    default:
      return state
  }
}

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
