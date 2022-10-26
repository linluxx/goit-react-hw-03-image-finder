import { LoadMoreBtn } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onLoadMoreClick }) => {
  return (
    <LoadMoreBtn type="button" onClick={onLoadMoreClick}>
      Load more
    </LoadMoreBtn>
  );
};

Button.propTypes = {
  onLoadMoreClick: PropTypes.func,
};
