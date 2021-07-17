import { useEffect, useState } from 'react';

import Header from 'components/Header';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { changeName, selectName } from 'store/slices/settings';

export default function App() {
  const [literal, setLiteral] = useState('');
  const [name, setName] = useState('');
  const nameFromRedux = useAppSelector(selectName);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (literal !== '') return;
    setLiteral('hello there');
    dispatch(changeName('obi wan'));
  }, []);

  useEffect(() => {
    setName(nameFromRedux);
  }, [literal]);

  return (
    <div>
      <Header title={literal} />
      <Header title={name} />
    </div>
  );
}
