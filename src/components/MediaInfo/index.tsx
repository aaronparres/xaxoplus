import { useParams } from 'react-router-dom';

interface ParamTypes {
  media_type: string;
  id: string;
}

export default function MediaInfo() {
  const { media_type, id } = useParams<ParamTypes>();

  return <div>{id}</div>;
}
