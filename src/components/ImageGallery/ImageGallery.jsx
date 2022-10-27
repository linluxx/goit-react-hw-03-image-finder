import { Component } from 'react';
import { Button } from 'components/Button/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';
import { Loader } from 'components/Loader/Loader';
import { getData } from 'components/Api/AxiosConfig';
// import axios from 'axios';
import PropTypes from 'prop-types';

// const KEY = '29800147-042a8c86586ab835e1f8a2965';
// axios.defaults.baseURL = 'https://pixabay.com/api/';
// const SEARCH_PARAMS =
//   'image_type=photo&orientation=horizontal&safesearch=true&per_page=12';

export class ImageGallery extends Component {
  state = {
    data: [],
    page: 1,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      props: { searchQuery },
      state: { page },
      showLoader,
      hideLoader,
    } = this;
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ page: 1, data: [] });
      getData(searchQuery, page, showLoader, hideLoader).then(res => {
        this.setState({ data: res });
      });
    }
    if (prevState.page !== page) {
      getData(searchQuery, page, showLoader, hideLoader).then(res => {
        this.setState(({ data }) => ({
          data: [...data, ...res],
        }));
      });
    }
  }

  onLoadMoreClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  showLoader = () => {
    this.setState({ isLoading: true });
  };

  hideLoader = () => {
    this.setState({ isLoading: false });
  };

  render() {
    const {
      onGalleryListClick,
      onLoadMoreClick,
      state: { data, isLoading },
    } = this;
    return (
      <>
        {isLoading && <Loader />}
        <Gallery onClick={onGalleryListClick}>
          {data.map(img => {
            return <ImageGalleryItem data={img} key={img.id} />;
          })}
        </Gallery>
        {data.length > 11 && <Button onLoadMoreClick={onLoadMoreClick} />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string,
};
