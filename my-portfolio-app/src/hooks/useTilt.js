/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";

function useTilt(options) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      VanillaTilt.init(ref.current, options);
    }
    return () => {
      if (ref.current && ref.current.vanillaTilt) {
        ref.current.vanillaTilt.destroy();
      }
    };
  }, [options]);

  return ref;
}

export default useTilt;
