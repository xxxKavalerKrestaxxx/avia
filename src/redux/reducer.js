import { combineReducers } from 'redux'

const ticketsInitialState = {
  tickets: [],
  searchID: '',
}

const ticketsReducer = (state = ticketsInitialState, action) => {
  switch (action.type) {
    case 'SET_TICKETS':
      return {
        ...state,
        tickets: state.tickets.concat(action.payload.tickets),
      }
    case 'SET_ID':
      return {
        ...state,
        searchID: state.id,
      }
    default:
      return state
  }
}

const menuInitialState = {
  checkedList: ['Без пересадок ', '1 пересадка', '2 пересадки', '3 пересадки'],
  indeterminate: true,
  checkAll: true,
  menu: 'САМЫЙ ДЕШЕВЫЙ',
  stop: false,
}

const menuReducer = (state = menuInitialState, action) => {
  switch (action.type) {
    case 'SET_CHECKED_LIST':
      return {
        ...state,
        checkedList: action.payload.checkedList,
        indeterminate:
          !!action.payload.checkedList.length && action.payload.checkedList.length < action.payload.plainOptions.length,
        checkAll: action.payload.checkedList.length === action.payload.plainOptions.length,
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
    default:
      return state
  }
}

const rootReducer = combineReducers({
  tickets: ticketsReducer,
  menu: menuReducer,
})

export default rootReducer
