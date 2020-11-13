import React, { useState, useRef } from "react";
//Components
import { Dropdown } from "../Dropdown/Dropdown";
//Styles
import "./Currency.scss";

//TODO:
// Add onClick input focus

//FIXME: remove me
let testArr = [
  { value: "EUR", name: "Euro", icon: "€" },
  { value: "RUB", name: "Russian Ruble", icon: "₽" },
  { value: "USD", name: "US Dollar", icon: "$" },
];

export const Currency = ({ array, icon, remove }) => {
  const [currency, setCurrency] = useState({});

  //Input focus
  const inputRef = useRef();

  const focusElem = (ref) => {
    console.log("click");
    ref.current.focus();
  };

  return (
    <section
      className="currency"
      tabIndex="0"
      onKeyDown={(e) => {
        if (
          (e.currentTarget === e.target && e.key === "Enter") ||
          (e.currentTarget === e.target && e.key === "Enter" && e.key === " ")
        ) {
          focusElem(inputRef);
        }
      }}
    >
      <div className="currency__top-part">
        <Dropdown
          list={testArr}
          defaultOptionIndex={0}
          onChoose={(currency) => setCurrency(currency)}
        />
        <button className="currency__remove-btn"></button>
      </div>
      <div
        className="currency__bottom-part"
        onClick={() => focusElem(inputRef)}
      >
        <label name="currency" className="currency__icon">
          {currency.icon}
        </label>
        <input
          name="currency"
          type="number"
          min="0"
          className="currency__input"
          ref={inputRef}
        />
      </div>
    </section>
  );
};
