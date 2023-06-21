import React from 'react'

import { formatTime, getDate } from '../../format-date/format-date'

import classes from './ticket.module.scss'

const Ticket = ({ ticket, price, origin, destination, carrier }) => {
  const logoSrc = `https://pics.avs.io/99/36/${carrier}.png`

  return (
    <div className={classes['ticket_container']}>
      <div className={classes['ticket_header']}>
        <div className={classes['ticket_price']}>{price.toLocaleString('ru-RU')} р</div>
        <img src={logoSrc} alt="company logo" className={classes['logotype']} />
      </div>
      <div className={classes['container_ticket_two']}>
        <div className={classes['ticket_polosa_grey']}>
          <div className={classes['Ticket_Item_item__destination__V9w+h']}>{`${origin} - ${destination}`}</div>
          <div>В ПУТИ</div>
          <div>
            {ticket.segments[0].stops.length === 0
              ? 'ПРЯМОЙ РЕЙС'
              : ticket.segments[0].stops.length === 1
              ? '1 ПЕРЕСАДКА'
              : `${ticket.segments[0].stops.length} ПЕРЕСАДКИ`}
          </div>
        </div>
        <div className={classes['ticket_polosa_black']}>
          <div>
            {formatTime(ticket.segments[0].date)}-{getDate(ticket.segments[0].date, ticket.segments[0].duration)}
          </div>
          <div>{`${Math.floor(ticket.segments[0].duration / 60)}ч ${ticket.segments[0].duration % 60}м`}</div>
          <div>{ticket.segments[0].stops.join(', ')}</div>
        </div>
        <div className={classes['ticket_polosa_grey']}>
          <div className={classes['Ticket_Item_item__destination__V9w+h']}>{`${destination} - ${origin}`}</div>
          <div>В ПУТИ</div>
          <div>
            {ticket.segments[1].stops.length === 0
              ? 'ПРЯМОЙ РЕЙС'
              : ticket.segments[1].stops.length === 1
              ? '1 ПЕРЕСАДКА'
              : `${ticket.segments[1].stops.length} ПЕРЕСАДКИ`}
          </div>
        </div>
        <div className={classes['ticket_polosa_black']}>
          <div>
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
