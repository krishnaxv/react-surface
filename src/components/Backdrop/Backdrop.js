import React, { Component } from 'react'
import { Spring } from 'react-spring'
import { preset } from '../preset'

class Backdrop extends Component {
  // Default backdrop animation
  backdropAnimation = preset.fadeIn

  state = {
    backdropAnimation: this.backdropAnimation.config.enter
  }

  render() {
    const { backdropAnimation } = this.state
    const { reducer: backdropReducer } = this.backdropAnimation

    return (
      <Spring from={backdropAnimation.from} to={backdropAnimation.to}>
        {value => (
          <div
            className="backdrop"
            onClick={e => this.onClickBackdrop(e)}
            style={backdropReducer(value)}
          />
        )}
      </Spring>
    )
  }
}

export { Backdrop }
