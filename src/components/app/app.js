import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Alert } from 'antd'

import Spinner from '../spinner/spinner'
import MenuLeft from '../menu-left/menu-left'
import Header from '../header/header'
import UpMenu from '../up-menu/up-menu'
import TicketList from '../ticket-list/ticket-list'
import TicketsAPI from '../../TicketsAPI/TicketsAPI'

import classes from './app.module.scss'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [warningsArray, setWarningsArray] = useState([])
  const dispatch = useDispatch()

  const fetcher = new TicketsAPI()

  useEffect(() => {
    const fetchSearchIdAndTickets = async () => {
      try {
        if (!navigator.onLine) {
          throw new Error('Отсутствует подключение к интернету.')
        }
        const searchId = await dispatch(fetcher.getSearchId())
        let stop
        do {
          stop = await dispatch(fetcher.getTickets(searchId))
        } while (!stop)
        setIsLoading(false)
      } catch (error) {
        setWarningsArray((prevWarnings) => [...prevWarnings, error.toString()])
        setIsLoading(false)
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
