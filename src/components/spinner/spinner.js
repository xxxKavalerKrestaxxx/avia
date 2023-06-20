import React from 'react'
import { Spin } from 'antd'
import './spinner.css'

export default class Spinner extends React.Component {
  render() {
    return (
      <div className="spinner-container">
        <Spin className="spinner" />
      </div>
    )
  }
}
