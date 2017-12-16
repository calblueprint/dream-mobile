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
				  textStyle={ textStyles.buttonTextSmall }
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
		if (this.props.secondaryButtonSmall) {
			return (
				<Button
				  onPress={this.props.onPress}
				  style={ buttonStyles.secondaryButtonSmall }
				  textStyle={ textStyles.buttonTextSecondarySmall }
			  	>{this.props.text}</Button>
			);
		}
		if (this.props.whiteButtonLarge) {
			return (
				<Button
				  onPress={this.props.onPress}
				  style={ buttonStyles.whiteButtonLarge } 
				  textStyle={ textStyles.buttonTextYellow }
			  	>{this.props.text}</Button>
			);
		}
		if (this.props.secondaryButtonLarge) {
			return (
				<Button
				  onPress={this.props.onPress}
				  style={ buttonStyles.secondaryButtonLarge } 
				  textStyle={ textStyles.buttonText }
			  	>{this.props.text}</Button>
			);
		}
		if (this.props.whiteButtonSmall) {
			return (
				<Button
				  onPress={this.props.onPress}
				  style={ buttonStyles.whiteButtonSmall } 
				  textStyle={ textStyles.buttonText }
			  	>{this.props.text}</Button>
			);
		}
		if (this.props.linkButton) {
			return (
				<Button
				  onPress={this.props.onPress}
				  style={ buttonStyles.linkButton } 
				  textStyle={ textStyles.linkText }
			  	>{this.props.text}</Button>
			);
		}
	}
};
