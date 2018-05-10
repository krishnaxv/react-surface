```jsx static
import { Modal } from '@krishnaxv/react-surface'
```

Basic usage.

```jsx static
<Modal />
```

Customize it using built-in props.

```jsx
const { spring, presets } = require('react-motion')
const { motion } = require('../')

// Should be used to position modal on the surface
const modalStyle = {
  bottom: 0,
  height: '320px',
  position: 'absolute',
  right: '32px',
  width: '240px'
}

const style = {
  backgroundColor: '#fff',
  fontFamily: 'sans-serif',
  padding: '16px'
}

initialState = { showModal: false }
;<div>
  <button onClick={() => setState({ showModal: true })}>Show Modal</button>
  {state.showModal && (
    <Modal
      motion={motion.slideInBottom}
      onClose={() => setState({ showModal: false })}
      style={modalStyle}
    >
      {onCloseModal => (
        <div style={style} onClick={() => onCloseModal()}>
          Click to close modal surface.
        </div>
      )}
    </Modal>
  )}
</div>
```
