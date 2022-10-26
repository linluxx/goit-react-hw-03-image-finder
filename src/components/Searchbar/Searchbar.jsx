import { Component } from 'react';
import {
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  Header,
} from './Searchbar.styled';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiSearch2Line } from 'react-icons/ri';
import PropTypes from 'prop-types';
export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };
  onSearchChange = evt => {
    this.setState({ searchQuery: evt.currentTarget.value.toLowerCase() });
  };

  onFormSubmit = evt => {
    evt.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      return toast.error('Fill the search field!', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };
  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.onFormSubmit}>
          <SearchFormButton type="submit">
            <RiSearch2Line />
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.onSearchChange}
          />
        </SearchForm>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
