import React from 'react'

import './ticket.css'

const Ticket = ({ ticket, price, origin, destination, carrier }) => {
  const logoSrc = `https://pics.avs.io/99/36/${carrier}.png`

  function formatTime(dateTimeString) {
    const date = new Date(dateTimeString)
    const hours = date.getUTCHours()
    const minutes = date.getUTCMinutes()
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    return formattedTime
  }
  function getDate(dateTimeString, duration) {
    const date = new Date(dateTimeString)
    const hours = date.getUTCHours() + Math.floor(duration / 60)
    const minutes = date.getUTCMinutes() + (duration % 60)

    let adjustedHours = hours
    let adjustedMinutes = minutes

    if (adjustedMinutes >= 60) {
      adjustedHours += 1
      adjustedMinutes -= 60
    }

    if (adjustedHours >= 24) {
      adjustedHours -= 24
    }

    const formattedTime = `${adjustedHours.toString().padStart(2, '0')}:${adjustedMinutes.toString().padStart(2, '0')}`
    return formattedTime
  }

  return (
    <div className="ticket_container">
      <div className="ticket_header">
        <div className="ticket_price">{price.toLocaleString('ru-RU')} р</div>
        <img src={logoSrc} alt="company logo" className="logotype" />
      </div>
      <div className="container_ticket_two">
        <div className="ticket_polosa_grey">
          <div className="Ticket_Item_item__destination__V9w+h">{`${origin} - ${destination}`}</div>
          <div>В ПУТИ</div>
          <div>
            {ticket.segments[0].stops.length === 0
              ? 'ПРЯМОЙ РЕЙС'
              : ticket.segments[0].stops.length === 1
              ? '1 ПЕРЕСАДКА'
              : `${ticket.segments[0].stops.length} ПЕРЕСАДКИ`}
          </div>
        </div>
        <div className="ticket_polosa_black">
          <div>
            {formatTime(ticket.segments[0].date)}-{getDate(ticket.segments[0].date, ticket.segments[0].duration)}
          </div>
          <div>{`${Math.floor(ticket.segments[0].duration / 60)}ч ${ticket.segments[0].duration % 60}м`}</div>
          <div>{ticket.segments[0].stops.join(', ')}</div>
        </div>
        <div className="ticket_polosa_grey">
          <div className="Ticket_Item_item__destination__V9w+h">{`${destination} - ${origin}`}</div>
          <div>В ПУТИ</div>
          <div>
            {ticket.segments[1].stops.length === 0
              ? 'ПРЯМОЙ РЕЙС'
              : ticket.segments[1].stops.length === 1
              ? '1 ПЕРЕСАДКА'
              : `${ticket.segments[1].stops.length} ПЕРЕСАДКИ`}
          </div>
        </div>
        <div className="ticket_polosa_black">
          <div>
            {' '}
            {formatTime(ticket.segments[1].date)}-{getDate(ticket.segments[1].date, ticket.segments[1].duration)}
          </div>
          <div>{`${Math.floor(ticket.segments[1].duration / 60)}ч ${ticket.segments[1].duration % 60}м`}</div>
          <div>{ticket.segments[1].stops.join(', ')}</div>
        </div>
      </div>
    </div>
  )
}
export default Ticket
