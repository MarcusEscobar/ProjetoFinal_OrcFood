import React, { useEffect } from "react";

const ItemModal = ({ isOpen, children }) => {
  if (isOpen) {
    return (
      <div className="modal_container" >
        {children}
      </div>
    );
  }

  return null;
};

export default ItemModal;
