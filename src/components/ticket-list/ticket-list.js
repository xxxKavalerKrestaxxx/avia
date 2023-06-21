import React, { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'

import Ticket from '../ticket/ticket'
import { formatArray, filterTicketByMenu } from '../../sort-array/sort-array'

import classes from './ticket-list.module.scss'

const TicketList = () => {
  const menu = useSelector((state) => state.menu.menu)
  const tickets = useSelector((state) => state.tickets.tickets)
  const [schet, setSchet] = useState(5)
  const addTickets = () => {
    setSchet((schet) => schet + 5)
  }

  const checkedList = useSelector((state) => state.menu.checkedList)

  const formattedArray = useMemo(() => formatArray(checkedList), [checkedList])

  const sortTickets = useMemo(() => filterTicketByMenu(tickets, menu, formattedArray), [tickets, menu, formattedArray])
  const firstFiveTickets = useMemo(() => sortTickets.slice(0, schet), [sortTickets, schet])

  if (firstFiveTickets.length > 0) {
    return (
      <>
        <ul className={classes['ticket_list']}>
          {firstFiveTickets.map((ticket) => (
            <Ticket
              ticket={ticket}
              key={ticket.price + ticket.carrier}
              price={ticket.price}
              origin={ticket.segments[0].origin}
              destination={ticket.segments[0].destination}
              carrier={ticket.carrier}
            />
          ))}
        </ul>
        <button onClick={addTickets} className={classes['button_five']}>
          показать еще 5 билетов
        </button>
      </>
    )
  }

  return null
}

export default TicketList
