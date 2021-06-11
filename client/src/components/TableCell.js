import React from "react";

export const TableCell = React.memo(({ children, onClickHandler }) => {
 
  return <td onClick={onClickHandler}>{children}</td>;
});
 