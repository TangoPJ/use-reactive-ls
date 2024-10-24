import { useMemo } from "react";

import { emit, useSubscribe } from "./useSubscribe";

type TValue = string | number | boolean | null | undefined;
type TStore = Record<string, TValue>;

const STORE_MAP = new Map<string, TStore>();

const getStore = <T extends TStore>(key: string, initialValue: T) => {
  const storeKey = `store_key_${key}`;
  let store = STORE_MAP.get(storeKey);

  if (!store) {
    const proxyHandler: ProxyHandler<any> = {
      set(target, prop, value, receiver) {
        try {
          return Reflect.set(target, prop, value, receiver);
        } finally {
          emit(store!);
          localStorage.setItem(storeKey, JSON.stringify(target));
        }
      },
    };

    try {
      const dataString = localStorage.getItem(storeKey);
      const dataObject = JSON.parse(dataString!);

      if (!dataObject) throw new Error("Store not value");

      if (typeof dataObject !== "object") throw new Error("Store not object");

      if (Array.isArray(dataObject)) throw new Error("Store is array");

      for (const key in dataObject) {
        const value = dataObject[key];

        if (typeof value === "object" && dataObject[key] !== null)
          throw new Error(`Prop ${key} is object`);

        if (typeof value === "bigint") throw new Error(`Prop ${key} is bigint`);
      }

      store = new Proxy(dataObject, proxyHandler);
    } catch (e) {
      store = new Proxy(Object.assign({}, initialValue), proxyHandler);
    }
  }

  STORE_MAP.set(storeKey, store!);
  return store! as T;
};

export const useStore = <T extends TStore>(key: string, initialValue?: T) => {
  const store = useMemo(
    () => getStore(key, initialValue ?? ({} as TStore)),
    [key],
  );
  return useSubscribe(store);
};
