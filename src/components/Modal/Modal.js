import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Motion } from 'react-motion'
import styled from 'styled-components'

import { motion } from '../motion'

// Container
const Container = styled.div`
  top: 0;
  left: 0;
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
 * Modal component
 * @class Modal
 * @extends {Component}
 */
class Modal extends Component {
  static propTypes = {
    /** Whether to close modal on backdrop click event. */
    closeOnBackdropClick: PropTypes.bool,
    /** Motion animation. */
    motion: PropTypes.object,
    /** Modal close event listener callback. */
    onClose: PropTypes.func,
    /** Whether to show modal backdrop. */
    showBackdrop: PropTypes.bool,
    /** Additional style for the modal surface. This can be used to position modal anywhere on the surface. */
    style: PropTypes.object
  }

  static defaultProps = {
    closeOnBackdropClick: true,
    motion: motion.fadeIn,
    showBackdrop: true,
    style: {}
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
   * @memberof Modal
   */
  onClickBackdrop(e) {
    if (
      this.props.closeOnBackdropClick === true &&
      e.target === this.container
    ) {
      this.onCloseModal()
    }
  }

  /**
   * Close modal
   * @memberof Modal
   */
  onCloseModal() {
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
   * @memberof Modal
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
   * @memberof Modal
   */
  getChildren(children) {
    const {
      motion: { reducer: childReducer },
      style
    } = this.props
    const { childMotion } = this.state

    return (
      <Motion defaultStyle={childMotion.from} style={childMotion.to}>
        {value => (
          <Wrapper style={{ ...style, ...childReducer(value) }}>
            {children(() => this.onCloseModal())}
          </Wrapper>
        )}
      </Motion>
    )
  }

  render() {
    const { children, showBackdrop } = this.props
    const { backdropMotion, renderComponent } = this.state
    const { reducer: backdropReducer } = this.backdropMotion

    if (renderComponent === false) {
      return null
    }

    if (showBackdrop === false) {
      return this.getChildren(children)
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

export { Modal }
