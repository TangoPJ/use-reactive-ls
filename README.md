Just for fun, I whipped up a custom React hook that makes localStorage reactive. The reactivity isn't stuck in one component — it's global! So whenever localStorage updates, every component using the hook stays in sync. Handy for keeping your app's state consistent across the board.

[Example in the online editor](https://stackblitz.com/edit/react-starter-typescript-3cjkkm?file=App.tsx)

![Screen Recording Oct 25](https://github.com/user-attachments/assets/d546d9ba-9738-4fec-9999-625961c3d39d)

### Usage:

```javascript
import React from 'react';
import { useStore } from 'use-reactive-ls';

export const App = () => {
  // set a name for the variable being saved.
  // it's the 'counter' in this example
  const store = useStore('counter', {
    count: 7,
  });

  return (
    <div>
      <button onClick={() => store.count++}>Inc</button>
      <button onClick={() => store.count--}>Dec</button>
    </div>
  )
}
```
In other components:

```javascript
import React from 'react';
import { useStore } from 'use-reactive-ls';

export const MyComponent = () => {
  const store = useStore('counter');

  return (
    <>
      <p>
        Saved value:{' '}
        <span>{store.count}</span>
      </p>
    </>
  );
};
```

Oh, and don’t forget to eat your broccoli 🥦 — it’s good for you!
