import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert } from 'antd'

import Spinner from '../spinner/spinner'
import MenuLeft from '../menu-left/menu-left'
import Header from '../header/header'
import UpMenu from '../up-menu/up-menu'
import TicketList from '../ticket-list/ticket-list'
import TicketsAPI from '../../TicketsAPI/TicketsAPI'
import { setTickets } from '../../redux/action'

import classes from './app.module.scss'

const App = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const [warningsArray, setWarningsArray] = useState([])

  const fetcher = new TicketsAPI()

  useEffect(() => {
    const fetchSearchIdAndTickets = async () => {
      try {
        if (!navigator.onLine) {
          throw new Error('Отсутствует подключение к интернету.')
        }
        const searchId = await fetcher.getSearchId()
        let tickets
        do {
          try {
            tickets = await fetcher.getTickets(searchId)
            dispatch(setTickets(tickets.tickets))
          } catch (error) {
            console.log(error.toString())
          }
        } while (!tickets || !tickets.stop)

        setIsLoading(false)
      } catch (error) {
        setWarningsArray((prevWarnings) => [...prevWarnings, error.toString()])
      }
    }

    fetchSearchIdAndTickets()
  }, [])

  const checkedList = useSelector((state) => state.menu.checkedList)

  if (warningsArray.length > 0) {
    return (
      <div className={classes.app}>
        <Header />
        <div className={classes.main}>
          <MenuLeft />
          <div className={classes.container}>
            <UpMenu />
            <div className={classes.trouble}>
              {warningsArray.map((item) => (
                <Alert key={item} message="woops, we have troubles" description={item} type="error" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  } else
    return (
      <div className={classes.app}>
        <Header />
        <div className={classes.main}>
          <MenuLeft />
          <div className={classes.container}>
            <UpMenu />
            {checkedList.length === 0 ? (
              <div className={classes['no_tickets_get']}>No tickets match these filters</div>
            ) : (
              <>
                {isLoading ? <Spinner /> : null}
                <TicketList />
              </>
            )}
          </div>
        </div>
      </div>
    )
}

export default App
