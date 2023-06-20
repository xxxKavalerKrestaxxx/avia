import React from 'react'
import { Checkbox } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import './menu-left.css'

const CheckboxGroup = Checkbox.Group

const plainOptions = ['Без пересадок ', '1 пересадка', '2 пересадки', '3 пересадки']

const MenuLeft = () => {
  const dispatch = useDispatch()
  const checkedList = useSelector((state) => state.checkedList)
  const indeterminate = useSelector((state) => state.indeterminate)
  const checkAll = useSelector((state) => state.checkAll)

  const onChange = (list) => {
    console.log(list)
    dispatch({ type: 'SET_CHECKED_LIST', payload: { checkedList: list, plainOptions } })
  }

  const onCheckAllChange = (e) => {
    if (e.target.checked == false) dispatch({ type: 'SET_CHECKED_LIST', payload: { checkedList: [], plainOptions } })
    else dispatch({ type: 'SET_CHECK_ALL', payload: { checkAll: e.target.checked, plainOptions } })
  }

  return (
    <div className="menu_left">
      <span className="menu_header">Количество пересадок</span>
      <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll} className="button_all">
        Все
      </Checkbox>

      <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} className="menu_boxes" />
    </div>
  )
}

export default MenuLeft
