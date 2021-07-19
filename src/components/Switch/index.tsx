import { useAppDispatch } from 'hooks/redux';
import { changeMediaType } from 'store/slices/settings';

export default function Switch() {
  const dispatch = useAppDispatch();

  const switchHandler = (type: string) => {
    dispatch(changeMediaType(type));
  };

  return (
    <div>
      <button onClick={() => switchHandler('movie')}>Movies</button>
      <button onClick={() => switchHandler('tv')}>Series</button>
    </div>
  );
}
