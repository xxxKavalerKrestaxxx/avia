import React from 'react'
import { Checkbox } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { setCheckedList, setCheckAll } from '../../redux/action.js'

import classes from './menu-left.module.scss'

const CheckboxGroup = Checkbox.Group

const plainOptions = ['Без пересадок ', '1 пересадка', '2 пересадки', '3 пересадки']

const MenuLeft = () => {
  const dispatch = useDispatch()
  const checkedList = useSelector((state) => state.menu.checkedList)
  const indeterminate = useSelector((state) => state.menu.indeterminate)
  const checkAll = useSelector((state) => state.menu.checkAll)

  const onChange = (list) => {
    dispatch(setCheckedList(list, plainOptions))
  }

  const onCheckAllChange = (e) => {
    if (!e.target.checked) {
      dispatch(setCheckedList([], plainOptions))
    } else {
      dispatch(setCheckAll(e.target.checked, plainOptions))
    }
  }

  return (
    <div className={classes['menu_left']}>
      <span className={classes['menu_header']}>Количество пересадок</span>
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
        className={classes['button_all']}
      >
        Все
      </Checkbox>

      <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} className={classes['menu_boxes']} />
    </div>
  )
}

export default MenuLeft
