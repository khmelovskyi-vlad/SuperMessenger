import { useRef, useEffect, useState } from "react";

export default function useOutsideModal(handleClickCloseModal) {
  const wrapperRef = useRef(null);
  const [openModals, setOpenModals] = useState([]);
  useEffect(() => {
      function handleClickOutside(event) {
          if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            handleClickCloseModal(openModals);
          }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
          document.removeEventListener("mousedown", handleClickOutside);
      };
  }, [openModals]);
  return [wrapperRef, setOpenModals];
}