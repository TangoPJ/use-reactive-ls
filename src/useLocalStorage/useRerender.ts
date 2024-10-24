import { useCallback, useState } from "react";

export const useRerender = () => {
  const [_, setState] = useState({});
  return useCallback(() => setState({}), []);
};
