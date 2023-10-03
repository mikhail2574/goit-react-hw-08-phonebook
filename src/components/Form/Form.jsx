import React from 'react';
import styles from './Form.module.css';
import Result from 'components/Result/Result';
import Filter from 'components/Filter/Filter';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from '../../redux/counter/selectors';
import { fetchContacts, addContact } from '../../redux/counter/api';
import { useEffect } from 'react';

const Form = () => {
  const filterItems = useSelector(state => state.item.filteredItems);
  const items = useSelector(state => state.item.allItems);
  const { isLoading, error } = useSelector(getContacts);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleSubmit = evt => {
    evt.preventDefault();
    const contact = {
      name: evt.target.elements.name.value,
      number: evt.target.elements.number.value,
      id: nanoid(),
    };

    const reservedName = items.some(user => user.name === contact.name);

    if (reservedName) {
      Notiflix.Notify.failure('You should take another name');
      return;
    } else {
      dispatch(addContact(contact));
      evt.target.elements.name.value = '';
      evt.target.elements.number.value = '';
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Phonebook</h2>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label htmlFor="number">Number</label>
        <input
          type="tel"
          id="number"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button className={styles.submitBtn} type="submit">
          Add contact
        </button>
      </form>
      <Filter />
      {isLoading && <b>Loading tasks...</b>}
      {error && <b>{error}</b>}
      <ul className={styles.gallery}>
        {filterItems.map(item => (
          <Result data={item} key={item.id} />
        ))}
      </ul>
    </>
  );
};

export default Form;
