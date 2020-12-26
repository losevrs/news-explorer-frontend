import { useState, useEffect } from 'react';
import errorImage from '../../images/Main/not-found.png';

export default function ImageWithError(props) {

  const [hasOnLoadError, setHasOnLoadError] = useState(false);

  useEffect(() => {
    setHasOnLoadError(false);
  }, [props.src]);

  const onLoadImageError = () => {
    setHasOnLoadError(true);
  }

  return (
    <img className={props.className}
      src={hasOnLoadError ? errorImage : props.src}
      alt={props.alt}
      onError={onLoadImageError}
      onClick={props.onClick} />
  );
}