import React from 'react';
import { View, Text, Button } from 'react-native';
import { commonStyles } from '../../styles/styles';
import styles from './styles';

import Modal from 'react-native-modalbox';

class SimpleModal extends React.Component {
  renderButtons() {
    const buttons = this.props.buttons.map((value, i) => {
      return(
        <Button
          key={i}
          title={value.title}
          onPress={value.callback}
        />
      )
    })

    return (
      <View style={styles.bottomButtons}>
        { buttons }
      </View>
    )
  }

  render() {
    return (
      <Modal
        style={styles.modal}
        onClosed={this.props.onClosed}
        isOpen={this.props.visible}>
        <View style={styles.header}>
          <Text>{this.props.title}</Text>
          <Button title='X' onPress={this.props.onClosed} />
        </View>
        <View style={styles.children}>
          {this.props.children}
        </View>
        {this.renderButtons()}
      </Modal>
    );
  }
}


SimpleModal.propTypes = {
  visible: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string.isRequired,
  buttons: React.PropTypes.array.isRequired,
  onClosed: React.PropTypes.func.isRequired,
};

export default SimpleModal;
