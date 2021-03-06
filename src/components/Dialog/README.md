```jsx static
import { Dialog } from '@krishnaxv/react-surface'
```

Basic usage.

```jsx static
<Dialog>{onCloseDialog => <div>Dialog</div>}</Dialog>
```

Customize it using built-in props.

```jsx
const { preset } = require('../preset')

const style = {
  alignItems: 'center',
  backgroundColor: '#fff',
  display: 'flex',
  fontFamily: 'sans-serif',
  height: '320px',
  justifyContent: 'center',
  padding: '16px',
  width: '320px'
}

initialState = { showDialog: false }
;<div>
  <button onClick={() => setState({ showDialog: true })}>Show Dialog</button>
  {state.showDialog && (
    <Dialog
      preset={preset.fadeIn}
      onClose={() => setState({ showDialog: false })}
    >
      {onCloseDialog => <div style={style}>Dialog</div>}
    </Dialog>
  )}
</div>
```
