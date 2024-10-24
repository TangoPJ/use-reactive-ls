import { useLayoutEffect } from "react";

import { useRerender } from "./useRerender";

const SUBSCRIBE_STORE = new Set<(v: object) => any>();

export const emit = (key: object) => {
  SUBSCRIBE_STORE.forEach((sub) => sub(key));
};

export const subscribe = (key: object, listener: Function) => {
  const subListener = (nowKey: object) => {
    if (key !== nowKey) return;
    listener();
  };

  return (
    SUBSCRIBE_STORE.add(subListener),
    () => {
      SUBSCRIBE_STORE.delete(subListener);
    }
  );
};

export const useSubscribe = <T extends object>(key: T): T => {
  const rerender = useRerender();
  useLayoutEffect(() => subscribe(key, rerender), [key]);
  return key;
};
