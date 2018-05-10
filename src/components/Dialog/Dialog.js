import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Motion } from 'react-motion'
import styled from 'styled-components'

import { motion } from '../'

// Container
const Container = styled.div`
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  perspective: 1300px;
  position: fixed;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9999999;
`

// Wrapper
const Wrapper = styled.div``

/**
 * Dialog component
 * Dialog component will always be displayed at the center of the screen.
 * @class Dialog
 * @extends {Component}
 */
class Dialog extends Component {
  static propTypes = {
    /** Close dialog on backdrop click event. */
    closeOnBackdropClick: PropTypes.bool,
    /** Motion animation. */
    motion: PropTypes.object,
    /** Dialog close event listener callback. */
    onClose: PropTypes.func
  }

  static defaultProps = {
    closeOnBackdropClick: true
  }

  // Default backdrop motion
  backdropMotion = motion.fadeIn

  state = {
    renderComponent: true,
    backdropMotion: this.backdropMotion.config.enter,
    childMotion: this.props.motion.config.enter
  }

  /**
   * Backdrop click event
   * @param {Object} e Event
   * @memberof Dialog
   */
  onClickBackdrop(e) {
    if (
      this.props.closeOnBackdropClick === true &&
      e.target === this.container
    ) {
      this.onCloseDialog()
    }
  }

  /**
   * Close dialog
   * @memberof Dialog
   */
  onCloseDialog() {
    // Close dialog
    this.setState(
      {
        backdropMotion: this.backdropMotion.config.exit,
        childMotion: this.props.motion.config.exit
      },
      () => {
        // 700 ms is taken as a safe time limit
        // At few instances, this might trigger a no-op warning as we are trying to `setState` on an unmounted component in `unmountComponent` method.
        // react-motion's `onRest` method is avoided as it is not guaranteed to be triggered in case user willingly clicks/taps the trigger button multiple times.
        setTimeout(() => {
          this.unmountComponent()
        }, 700)
      }
    )
  }

  /**
   * Unmount component
   * @memberof Dialog
   */
  unmountComponent() {
    this.setState({
      renderComponent: false
    })

    // Close callback
    if (this.props.onClose) {
      this.props.onClose()
    }
  }

  /**
   * Get children
   * @param {function} children Component's children
   * @returns Component
   * @memberof Dialog
   */
  getChildren(children) {
    const {
      motion: { reducer: childReducer }
    } = this.props
    const { childMotion } = this.state

    return (
      <Motion defaultStyle={childMotion.from} style={childMotion.to}>
        {value => (
          <Wrapper style={childReducer(value)}>
            {children(() => this.onCloseDialog())}
          </Wrapper>
        )}
      </Motion>
    )
  }

  render() {
    const { children } = this.props
    const { backdropMotion, renderComponent } = this.state
    const { reducer: backdropReducer } = this.backdropMotion

    if (renderComponent === false) {
      return null
    }

    return (
      <Motion defaultStyle={backdropMotion.from} style={backdropMotion.to}>
        {value => (
          <Container
            innerRef={container => {
              this.container = container
            }}
            onClick={e => this.onClickBackdrop(e)}
            style={backdropReducer(value)}
          >
            {this.getChildren(children)}
          </Container>
        )}
      </Motion>
    )
  }
}

export { Dialog }
