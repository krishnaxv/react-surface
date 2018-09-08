import React, { Component } from 'react'
import { Transition } from 'react-spring'
import { preset } from '../preset'

class Backdrop extends Component {
  // Default backdrop animation
  backdropAnimation = preset.fadeIn

  render() {
    const {
      config: { from, to },
      reducer: backdropReducer
    } = this.backdropAnimation

    return (
      <Transition from={from} enter={to} leave={from}>
        {this.props.open &&
          (value => (
            <div
              className="backdrop"
              onClick={this.handleClick}
              style={backdropReducer(value)}
            />
          ))}
      </Transition>
    )
  }

  /**
   * Backdrop click event
   * @param {Object} e Event
   * @memberof Backdrop
   */
  handleClick = e => {
    this.setState({
      open: false
    })
    this.props.onClick()
  }
}

export { Backdrop }
