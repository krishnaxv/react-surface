import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Spring } from 'react-spring'
import { preset } from '../preset'
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
    /** Enable parent's scrollbar when modal is closed. */
    enableScrollOnClose: PropTypes.bool,
    /** Parent element. */
    parent: PropTypes.instanceOf(Element),
    /** Animation preset. */
    preset: PropTypes.object,
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
    enableScrollOnClose: true,
    hideScroll: true,
    parent: defaultParent,
    preset: preset.fadeIn,
    showBackdrop: true,
    style: {}
  }

  // Default backdrop animation
  backdropAnimation = preset.fadeIn

  state = {
    renderComponent: true,
    backdropAnimation: this.backdropAnimation.config.enter,
    childAnimation: this.props.preset.config.enter
  }

  /**
   * Backdrop click event
   * @param {Object} e Event
   * @memberof Modal
   */
  onClickBackdrop(e) {
    if (this.props.closeOnBackdropClick === true) {
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
        backdropAnimation: this.backdropAnimation.config.exit,
        childAnimation: this.props.preset.config.exit
      },
      () => {
        // 700 ms is taken as a safe time limit
        // At few instances, this might trigger a no-op warning as we are trying to `setState` on an unmounted component in `unmountComponent` method.
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

    // Before component unmount, add parent's scrollbar
    if (this.props.enableScrollOnClose) {
      this.toggleScroll(false)
    }

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
      preset: { reducer: childReducer },
      style
    } = this.props
    const { childAnimation } = this.state

    return (
      <Spring from={childAnimation.from} to={childAnimation.to}>
        {value => (
          <div
            className="modal__wrapper"
            style={{ ...style, ...childReducer(value) }}
          >
            {children(() => this.onCloseModal())}
          </div>
        )}
      </Spring>
    )
  }

  /**
   * Toggle parent's scrollbar
   * @param {boolean} hideScroll Hide scrollbar
   * @memberof Dialog
   */
  toggleScroll(hideScroll) {
    const { parent } = this.props

    // Show/hide scrollbar
    hideScroll
      ? parent.classList.add('scroll--hide')
      : parent.classList.remove('scroll--hide')
  }

  componentDidMount() {
    if (this.props.hideScroll) {
      // Hide scrollbar
      this.toggleScroll(true)
    }
  }

  componentWillUnmount() {
    if (this.props.enableScrollOnClose) {
      // Show scrollbar
      this.toggleScroll(false)
    }
  }

  render() {
    const { children, parent, showBackdrop } = this.props
    const { backdropAnimation, renderComponent } = this.state
    const { reducer: backdropReducer } = this.backdropAnimation

    if (renderComponent === false) {
      return null
    }

    if (showBackdrop === false) {
      return this.getChildren(children)
    }

    return (
      <div
        className="modal__container"
        style={
          parent !== defaultParent
            ? { position: 'absolute', top: parent.scrollTop }
            : {}
        }
      >
        <Spring from={backdropAnimation.from} to={backdropAnimation.to}>
          {value => (
            <div
              className="backdrop"
              onClick={e => this.onClickBackdrop(e)}
              style={backdropReducer(value)}
            />
          )}
        </Spring>
        {this.getChildren(children)}
      </div>
    )
  }
}

export { Modal }
