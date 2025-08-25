import { createPortal } from "react-dom";
export default function Modal({ ref, children }) {
  return createPortal(
    <dialog ref={ref} className="modal">
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
