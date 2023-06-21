import React, { useState } from 'react'
import { Button } from 'antd'
import './up-menu.scss'
import { useDispatch, useSelector } from 'react-redux'

import { setMenu } from '../../redux/action.js'

const UpMenu = () => {
  const dispatch = useDispatch()
  const menu = useSelector((state) => state.menu.menu)
  const [activeButton, setActiveButton] = useState(menu)

  const handleButtonMenu = (event) => {
    const selectedMenu = event.target.textContent
    dispatch(setMenu(selectedMenu))
    setActiveButton(selectedMenu)
  }

  return (
    <div className="ant-space-compact">
      <Button
        type="default"
        className={`button ant-btn-compact-first-item ant-btn-compact-item ${
          activeButton === 'САМЫЙ ДЕШЕВЫЙ' ? 'button_active' : ''
        }`}
        onClick={handleButtonMenu}
      >
        САМЫЙ ДЕШЕВЫЙ
      </Button>
      <Button
        type="default"
        className={`button ant-btn-compact-item ${activeButton === 'САМЫЙ БЫСТРЫЙ' ? 'button_active' : ''}`}
        onClick={handleButtonMenu}
      >
        САМЫЙ БЫСТРЫЙ
      </Button>
      <Button
        type="default"
        className={`button ant-btn-compact-last-item ant-btn-compact-item ${
          activeButton === 'ОПТИМАЛЬНЫЙ' ? 'button_active' : ''
        }`}
        onClick={handleButtonMenu}
      >
        ОПТИМАЛЬНЫЙ
      </Button>
    </div>
  )
}

export default UpMenu
