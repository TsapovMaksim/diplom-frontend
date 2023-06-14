import { useCallback, useState } from 'react';

export default function useModal() {
  const [visible, setVisible] = useState(false);

  const close = useCallback(() => {
    setVisible(false);
  }, []);

  const open = useCallback(() => {
    setVisible(true);
  }, []);

  return { visible, close, open };
}
