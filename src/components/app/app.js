import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Spinner from '../spinner/spinner'
import MenuLeft from '../menu-left/menu-left'
import Header from '../header/header'
import UpMenu from '../up-menu/up-menu'
import TicketList from '../ticket-list/ticket-list'
import TicketsAPI from '../../TicketsAPI/TicketsAPI'

import './app.css'

const App = () => {
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(true)

  const fetcher = new TicketsAPI()
  useEffect(() => {
    const fetchSearchIdAndTickets = async () => {
      try {
        const searchId = await fetcher.getSearchId()
        console.log(searchId)

        let tickets
        do {
          try {
            tickets = await fetcher.getTickets(searchId)
            console.log(tickets)
            dispatch({ type: 'SET_TICKETS', payload: { tickets: tickets.tickets, stop: tickets.stop } })
          } catch (error) {
            console.log('Error fetching tickets:', error)
          }
        } while (!tickets || !tickets.stop)

        setIsLoading(false)
      } catch (error) {
        console.log('Error fetching search ID:', error)
      }
    }

    fetchSearchIdAndTickets()
  }, [])
  const checkedList = useSelector((state) => state.checkedList)
  if (checkedList.length == 0) {
    return (
      <div className="app">
        <Header />
        <div className="main">
          <MenuLeft />
          <div className="container">
            <UpMenu />
            <div className="no_tickets_get">No tickets match these filters</div>
            {isLoading ? <Spinner /> : null}
          </div>
        </div>
      </div>
    )
  } else
    return (
      <div className="app">
        <Header />
        <div className="main">
          <MenuLeft />
          <div className="container">
            <UpMenu />
            {isLoading ? <Spinner /> : null}
            <TicketList />
          </div>
        </div>
      </div>
    )
}

export default App
