export function formatArray(transfers) {
  const mapp = {
    'Без пересадок': 0,
    '1 пересадка': 1,
    '2 пересадки': 2,
    '3 пересадки': 3,
  }
  const formattedArray = transfers.map((transfer) => mapp[transfer] || 0)
  return formattedArray
}

export function filterTicketsBySegments(tickets, formattedArray) {
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

export function filterTicketByMenu(tickets, menu, formattedArray) {
  let copyTickets = [...tickets]
  copyTickets = filterTicketsBySegments(copyTickets, formattedArray)
  if (menu == 'САМЫЙ ДЕШЕВЫЙ') {
    copyTickets = copyTickets.sort((a, b) => a.price - b.price)
  } else if (menu == 'САМЫЙ БЫСТРЫЙ') {
    copyTickets = copyTickets.sort((a, b) => {
      const totalDurationA = a.segments.reduce((total, segment) => total + segment.duration, 0)
      const totalDurationB = b.segments.reduce((total, segment) => total + segment.duration, 0)
      return totalDurationA - totalDurationB
    })
  }
  return copyTickets
}
