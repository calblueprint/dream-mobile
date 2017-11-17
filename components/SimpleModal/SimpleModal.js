import React from 'react';
import { View, Text, Button } from 'react-native';
import { commonStyles } from '../../styles/styles';
import styles from './styles';

import Modal from 'react-native-modalbox';

/**
  * Basic Modal that by default enters from bottom, is centered,
  * has a 50% transparent black backdrop, and a top right cancel button.
  *
  * Takes in props for callback when modal is closed, isOpen boolean, title,
  * and buttons (read renderButtons for more details).
  */
class SimpleModal extends React.Component {
  /**
    * Renders given buttons from props, received in the form:
    * eg: [{ title: 'Yes', callback: onYesPressed }, ...]
    * These buttons will be rendered at the bottom of the modal.
    */
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

  // TODO (Kelsey): replace X button with icon
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
