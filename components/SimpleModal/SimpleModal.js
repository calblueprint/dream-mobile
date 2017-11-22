import React from 'react';
import { View, Text, Button } from 'react-native';
import { commonStyles } from '../../styles/styles';
import styles from './styles';
import StyledButton from '../../components/Button/Button';
import Modal from 'react-native-modalbox';
import { textStyles } from '../../styles/textStyles';

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
      if (value.type == 'secondary') {
        return(
          <StyledButton
            key={i}
            onPress={value.callback}
            text={value.title}
            secondaryButtonSmall
          >
          </StyledButton>
        )
      }

      return(
        <StyledButton
          key={i}
          onPress={value.callback}
          text={value.title}
          primaryButtonSmall
        >
        </StyledButton>
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
          <Text style={[textStyles.titleMedium, {marginRight: 8}]}>{this.props.title}</Text>
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
