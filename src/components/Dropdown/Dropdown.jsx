import React, { useState, useEffect, useRef } from "react";
//Hooks
import { useClickOutside } from "../../hooks/useClickOutside";
//Components
import { ControlBtn } from "../ControlBtn/ControlBtn";
import { Scrollbar } from "../Scrollbar/Scrollbar";
//Styles
import "./Dropdown.scss";
//Icons
import down from "../../icons/down.svg";
import up from "../../icons/up.svg";

//Dropdown component
export const Dropdown = ({ list, defaultOptionIndex, onChoose }) => {
  const [opened, setOpened] = useState(false);
  const [option, setOption] = useState(list[defaultOptionIndex]);

  useEffect(() => {
    onChoose(option);
  }, [option]);

  //Open function
  const toggleOpened = () => {
    setOpened(!opened);
  };

  //Choose option
  const chooseOption = (item) => {
    setOption(item);
    toggleOpened();
  };

  //Close menu (if click or focus outside)
  const menuRef = useRef();
  useClickOutside(menuRef, toggleOpened);

  //Dropdown options items
  const options = list.map((item, index) => {
    return (
      <li className="list-item" key={index}>
        <button
          className="list-item__button"
          onClick={() => chooseOption(item)}
        >
          <span className="list-item__name">{item.name}</span>
          <span>
            <span className="list-item__value">{item.value}</span>
            <span className="list-item__icon">{item.icon}</span>
          </span>
        </button>
      </li>
    );
  });

  return (
    <section className="dropdown">
      <ControlBtn
        label={option.name}
        icon={opened ? up : down}
        reversed={true}
        big={true}
        onClick={toggleOpened}
        active={opened}
      />
      {opened && (
        <div
          className="dropdown__menu"
          ref={menuRef}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              toggleOpened();
            }
          }}
        >
          <input
            type="search"
            className="dropdown__menu-search"
            placeholder="Type for search..."
          />
          <Scrollbar style={{ height: 133 }}>
            <ul className="dropdown__list">
              {options}
              {options}
            </ul>
          </Scrollbar>
        </div>
      )}
    </section>
  );
};
