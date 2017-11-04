import React from 'react';
import { View, Modal } from 'react-native';
import { commonStyles } from '../../styles/styles';
import styles from './styles';

class SimpleModal extends React.Component {
  render() {
    return (
      <Modal
        transparent={false}
        visible={this.props.visible}
        >
        {this.props.children}
      </Modal>
    );
  }
}


SimpleModal.propTypes = {
  visible: React.PropTypes.bool.isRequired,
};

export default SimpleModal;
