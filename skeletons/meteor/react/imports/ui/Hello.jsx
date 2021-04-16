import React, { useState } from 'react';
{{! BUTTON_IMPORT !}}

export const Hello = () => {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  };

  return (
    <div>
      <{{! BUTTON !}} onClick={increment}>Click Me</{{! BUTTON !}}>
      <p>You've pressed the button {counter} times.</p>
    </div>
  );
};
