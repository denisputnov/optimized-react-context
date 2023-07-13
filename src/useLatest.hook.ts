import {useLayoutEffect, useRef} from "react";

export function useLatest<T>(value: T) {
  const ref = useRef<T>(value)

  useLayoutEffect(() => {
    ref.current = value;
  }, [value])

  return ref
}
