import { Component } from 'react';
import { Button } from 'components/Button/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';
import { Loader } from 'components/Loader/Loader';
import axios from 'axios';
import PropTypes from 'prop-types';

const KEY = '29800147-042a8c86586ab835e1f8a2965';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const SEARCH_PARAMS =
  'image_type=photo&orientation=horizontal&safesearch=true&per_page=12';

export class ImageGallery extends Component {
  state = {
    data: [],
    page: 1,
    isLoading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ page: 1, data: [] });
      this.getData().then(res => {
        this.setState({ data: res });
      });
    }
    if (prevState.page !== this.state.page) {
      this.getData().then(res => {
        this.setState(({ data }) => ({
          data: [...data, ...res],
        }));
      });
    }
  }

  getData = async () => {
    try {
      this.toggleLoader();
      const response = await axios.get(
        `?key=${KEY}&q=${this.props.searchQuery}&${SEARCH_PARAMS}&page=${this.state.page}`
      );
      this.toggleLoader();
      return response.data.hits;
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onLoadMoreClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleLoader = () => {
    this.setState(state => ({ isLoading: !state.isLoading }));
  };

  render() {
    return (
      <>
        {this.state.isLoading && <Loader />}
        <Gallery onClick={this.onGalleryListClick}>
          {this.state.data.map(img => {
            return <ImageGalleryItem data={img} key={img.id} />;
          })}
        </Gallery>
        {this.state.data.length > 11 && (
          <Button onLoadMoreClick={this.onLoadMoreClick} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string,
};
