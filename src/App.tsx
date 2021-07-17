import { useEffect, useState } from 'react';

import Header from 'components/Header';

export default function App() {
  const [literal, setLiteral] = useState('');

  useEffect(() => {
    if (literal !== '') return;
    setLiteral('hello there');
  }, []);

  return (
    <div>
      <Header title={literal} />
    </div>
  );
}
