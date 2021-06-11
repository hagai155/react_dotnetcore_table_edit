import React from "react";

export const Input = ({
  name,
  type,
  maxLength,
  value,
  onChangeHandler,
  onKeyDownHandler,
}) => {
  return (
    <input
      name={name}
      type={type}
      maxLength={maxLength}
      value={value}
      onChange={onChangeHandler}
      onKeyDown={onKeyDownHandler}
    />
  );
};
