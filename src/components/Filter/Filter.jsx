import React from 'react';
import styles from './Filter.module.css';
import { filterItems } from '../../redux/counter/itemSlice';
import { useDispatch } from 'react-redux';

const Filter = () => {
  const dispatch = useDispatch();

  const searchFocus = () => {
    document.querySelector('form').style.display = 'none';
  };

  const searchOffFocus = () => {
    document.querySelector('form').style.display = 'flex';
  };

  const filterItem = e => {
    return dispatch(filterItems(e.target.value)); // Вызываем экшен для фильтрации
  };

  return (
    <div className={styles.search}>
      <h2>Find contact by name</h2>
      <input
        className={styles.inputSearch}
        type="text"
        name="search"
        onChange={filterItem}
        onFocus={searchFocus}
        onBlur={searchOffFocus}
      />
    </div>
  );
};

export default Filter;
