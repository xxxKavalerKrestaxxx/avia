import React from 'react'
import { Spin } from 'antd'

import classes from './spinner.module.scss'

export default class Spinner extends React.Component {
  render() {
    return (
      <div className={classes['spinner-container']}>
        <Spin className={classes['spinner']} />
      </div>
    )
  }
}
