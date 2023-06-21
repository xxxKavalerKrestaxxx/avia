import React from 'react'

import { ReactComponent as Logo } from '../../img/Logo.svg'

import classes from './header.module.scss'

const Header = () => {
  return (
    <div className={classes.header}>
      <Logo />
    </div>
  )
}

export default Header
