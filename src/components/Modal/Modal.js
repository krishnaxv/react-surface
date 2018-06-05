import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Motion } from 'react-motion'

import { motion } from '../motion'

import './style.css'

// Set document body as default parent
const defaultParent = document.querySelector('body')

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
    /** Hide scrollbar of parent element (defaults to document's body). */
    hideScroll: PropTypes.bool,
    /** Whether to show modal backdrop. */
    showBackdrop: PropTypes.bool,
    /** Additional style for the modal surface. This can be used to position modal anywhere on the surface. */
    style: PropTypes.object
  }

  static defaultProps = {
    closeOnBackdropClick: true,
    hideScroll: true,
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
          <div
            className="modal__wrapper"
            style={{ ...style, ...childReducer(value) }}
          >
            {children(() => this.onCloseModal())}
          </div>
        )}
      </Motion>
    )
  }

  componentDidMount() {
    if (this.props.hideScroll) {
      // Hide scrollbar
      defaultParent.classList.add('hide-scroll')
    }
  }

  componentWillUnmount() {
    if (this.props.hideScroll) {
      // Show scrollbar
      defaultParent.classList.remove('hide-scroll')
    }
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
          <div
            className="modal__container"
            ref={container => {
              this.container = container
            }}
            onClick={e => this.onClickBackdrop(e)}
            style={backdropReducer(value)}
          >
            {this.getChildren(children)}
          </div>
        )}
      </Motion>
    )
  }
}

export { Modal }
