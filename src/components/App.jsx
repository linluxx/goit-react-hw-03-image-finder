import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    searchQuery: '',
  };
  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };
  render() {
    return (
      <Container>
        <ToastContainer />
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchQuery={this.state.searchQuery}></ImageGallery>
      </Container>
    );
  }
}
