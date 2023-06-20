import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import Ticket from '../ticket/ticket'
import './ticket-list.css'

const TicketList = () => {
  const menu = useSelector((state) => state.menu)
  const tickets = useSelector((state) => state.tickets)
  const [schet, setSchet] = useState(5)
  const addTickets = () => {
    setSchet((schet) => schet + 5)
  }

  const checkedList = useSelector((state) => state.checkedList)
  function formatArray(transfers) {
    const mapp = {
      'Без пересадок': 0,
      '1 пересадка': 1,
      '2 пересадки': 2,
      '3 пересадки': 3,
    }
    const formattedArray = transfers.map((transfer) => mapp[transfer] || 0)
    console.log(formattedArray)
    return formattedArray
  }

  function filterTicketsBySegments(tickets, formattedArray) {
    const filteredTickets = tickets.filter((ticket) => {
      if (
        (ticket.segments && ticket.segments[0].stops && ticket.segments[1].stops) ||
        ticket.segments[0].stops.length > 0 ||
        ticket.segments[1].stops.length > 0
      ) {
        const segmentsLength1 = ticket.segments[0].stops.length
        const segmentsLength2 = ticket.segments[1].stops.length
        return formattedArray.includes(segmentsLength1) || formattedArray.includes(segmentsLength2)
      } else if (ticket.segments[0].stops == 0 || ticket.segments[1].stops == 0) {
        return formattedArray.includes('0')
      }
    })

    return filteredTickets
  }

  const formattedArray = formatArray(checkedList)

  if (tickets.length > 0) {
    let mass = [...tickets]
    mass = filterTicketsBySegments(mass, formattedArray)
    if (menu == 'САМЫЙ ДЕШЕВЫЙ') {
      mass = mass.sort((a, b) => a.price - b.price)
    } else if (menu == 'САМЫЙ БЫСТРЫЙ') {
      mass = mass.sort((a, b) => {
        const totalDurationA = a.segments.reduce((total, segment) => total + segment.duration, 0)
        const totalDurationB = b.segments.reduce((total, segment) => total + segment.duration, 0)
        return totalDurationA - totalDurationB
      })
    }
    let firstFiveTickets = mass.slice(0, schet)
    return (
      <>
        <ul className="ticket_list">
          {firstFiveTickets.map((ticket, index) => (
            <Ticket
              ticket={ticket}
              key={index}
              price={ticket.price}
              origin={ticket.segments[0].origin}
              destination={ticket.segments[0].destination}
              stops={ticket.segments[0].stops}
              duration={ticket.segments[0].duration}
              carrier={ticket.carrier}
            />
          ))}
        </ul>
        <button onClick={addTickets} className="button_five">
          показать еще 5 билетов
        </button>
      </>
    )
  }

  return null
}

export default TicketList
