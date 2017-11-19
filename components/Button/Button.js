import React from 'react';
import Button from 'apsl-react-native-button';
import { buttonStyles } from './styles'
import colors from '../../styles/colors';
import { textStyles } from '../../styles/textStyles';

export default class StyledButton extends React.Component {
	render() {
		if (this.props.primaryButtonLarge) {
			return (
				<Button
				  onPress={this.props.onPress}
				  style={ buttonStyles.primaryButtonLarge } 
				  textStyle={ textStyles.buttonText }
			  	>{this.props.text}</Button>
			);
		}
		if (this.props.primaryButtonSmall) {
			return (
				<Button
				  onPress={this.props.onPress}
				  style={ buttonStyles.primaryButtonSmall } 
				  textStyle={ textStyles.buttonText }
			  	>{this.props.text}</Button>
			);
		}
		if (this.props.clearButtonSmall) {
			return (
				<Button
				  onPress={this.props.onPress}
				  style={ buttonStyles.clearButtonSmall } 
				  textStyle={ textStyles.buttonTextSmall }
			  	>{this.props.text}</Button>
			);
		}
	}
};
