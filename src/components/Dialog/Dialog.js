import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Transition } from 'react-spring'
import { Backdrop } from '../Backdrop'
import { preset } from '../preset'
import './style.css'

// Set document body as default parent
const defaultParent = document.querySelector('body')

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
    /** Enable parent's scrollbar when dialog is closed. */
    enableScrollOnClose: PropTypes.bool,
    /** Parent element. */
    parent: PropTypes.instanceOf(Element),
    /** Animation preset. */
    preset: PropTypes.object,
    /** Dialog close event listener callback. */
    onClose: PropTypes.func,
    /** Hide scrollbar of parent element (defaults to document's body). */
    hideScroll: PropTypes.bool
  }

  static defaultProps = {
    closeOnBackdropClick: true,
    enableScrollOnClose: true,
    hideScroll: true,
    parent: defaultParent,
    preset: preset.fadeIn
  }

  // Child animation
  childAnimation = this.props.preset

  state = {
    open: true,
    renderComponent: true
  }

  /**
   * Backdrop click event
   * @param {Object} e Event
   * @memberof Dialog
   */
  handleBackdropClick = e => {
    if (this.props.closeOnBackdropClick === true) {
      this.onCloseDialog()
    }
  }

  /**
   * Close dialog
   * @memberof Dialog
   */
  onCloseDialog = () => {
    // Close dialog
    this.setState(
      {
        open: false
      },
      () => {
        // 700 ms is taken as a safe time limit
        // At few instances, this might trigger a no-op warning as we are trying to `setState` on an unmounted component in `unmountComponent` method.
        setTimeout(this.unmountComponent, 700)
      }
    )
  }

  /**
   * Unmount component
   * @memberof Dialog
   */
  unmountComponent = () => {
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
   * @memberof Dialog
   */
  getChildren = children => {
    const {
      config: { from, to },
      reducer: childReducer
    } = this.childAnimation

    return (
      <Transition from={from} enter={to} leave={from}>
        {this.state.open &&
          (value => (
            <div className="dialog__wrapper" style={childReducer(value)}>
              {children(this.onCloseDialog)}
            </div>
          ))}
      </Transition>
    )
  }

  /**
   * Toggle parent's scrollbar
   * @param {boolean} hideScroll Hide scrollbar
   * @memberof Dialog
   */
  toggleScroll = hideScroll => {
    // Show/hide scrollbar
    hideScroll
      ? this.props.parent.classList.add('scroll--hide')
      : this.props.parent.classList.remove('scroll--hide')
  }

  componentDidMount() {
    if (this.props.hideScroll) {
      // Hide scrollbar
      this.toggleScroll(true)
    }
  }

  render() {
    const { children, parent } = this.props
    const { open, renderComponent } = this.state

    if (renderComponent === false) {
      return null
    }

    return ReactDOM.createPortal(
      <div
        className="dialog__container"
        style={
          parent !== defaultParent
            ? { position: 'absolute', top: parent.scrollTop }
            : {}
        }
      >
        <Backdrop open={open} onClick={this.handleBackdropClick} />
        {this.getChildren(children)}
      </div>,
      parent
    )
  }
}

export { Dialog }
