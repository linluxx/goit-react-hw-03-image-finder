import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
import { GalleryImage, GalleryItem } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };
  toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };
  render() {
    const { data } = this.props;
    return (
      <GalleryItem>
        <GalleryImage
          onClick={this.toggleModal}
          src={data.webformatURL}
          alt={data.tags}
        />
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={data.largeImageURL} alt={data.tags} />
          </Modal>
        )}
      </GalleryItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  data: PropTypes.object,
};
