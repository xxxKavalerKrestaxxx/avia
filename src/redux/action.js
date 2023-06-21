import { createAction } from 'redux-action'

export const setCheckedList = createAction('SET_CHECKED_LIST', (checkedList, plainOptions) => ({
  checkedList,
  plainOptions,
}))

export const setCheckAll = createAction('SET_CHECK_ALL', (checkAll, plainOptions) => ({
  checkAll,
  plainOptions,
}))

export const setMenu = createAction('SET_MENU', (menu, stop) => ({
  menu,
  stop,
}))

export const setTickets = createAction('SET_TICKETS', (tickets) => ({
  tickets,
}))
