import { useEffect, useRef } from 'react';

export default function usePrev<T>(value: T) {
  const prev = useRef<T>();

  useEffect(() => {
    prev.current = value;
  }, [value]);

  return prev.current;
}
