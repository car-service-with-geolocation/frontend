import PropTypes from 'prop-types';

import s from './styles/Header.module.css';

function Header({ title, children, ...props }) {
  return (
    <div className={s.header}>
      <h2 {...props}>{title}</h2>
      {children}
    </div>
  );
}

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
