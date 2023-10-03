import styles from './Result.module.css';
import PropTypes from 'prop-types';
import { deleteContact } from '../../redux/counter/api';
import { useDispatch } from 'react-redux';

const Result = ({ data }) => {
  const dispatch = useDispatch();
  const { id, name, number } = data;
  return (
    <li className={styles.card}>
      <p className={styles.name}>
        {name} 📞 {number}
      </p>
      <button
        className={styles.deleteBtn}
        data-id={id}
        type="button"
        onClick={() => dispatch(deleteContact(id))}
      >
        🗑️
      </button>
    </li>
  );
};

Result.propTypes = {
  data: PropTypes.object,
};

export default Result;
