import React, { useEffect } from 'react'
import { Button } from 'antd'
import './up-menu.css'
import { useDispatch, useSelector } from 'react-redux'

const UpMenu = () => {
  const dispatch = useDispatch()
  const menu = useSelector((state) => state.menu)
  const handleButtonMenu = (event) => {
    dispatch({
      type: 'SET_MENU',
      payload: {
        menu: event.target.textContent,
      },
    })
  }
  useEffect(() => {
    console.log(menu)
  }, [menu])
  return (
    <div className="ant-space-compact ">
      <Button
        type="default"
        className="button ant-btn-compact-first-item ant-btn-compact-item"
        onClick={handleButtonMenu}
      >
        САМЫЙ ДЕШЕВЫЙ
      </Button>
      <Button type="default" className="button ant-btn-compact-item" onClick={handleButtonMenu}>
        САМЫЙ БЫСТРЫЙ
      </Button>
      <Button
        type="default"
        className="button ant-btn-compact-last-item ant-btn-compact-item"
        onClick={handleButtonMenu}
      >
        ОПТИМАЛЬНЫЙ
      </Button>
    </div>
  )
}

export default UpMenu
