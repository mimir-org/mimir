import React, { useEffect } from "react";

export const useOutsideClick = (ref: React.MutableRefObject<HTMLDivElement>, callback: () => void) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, callback]);
};
