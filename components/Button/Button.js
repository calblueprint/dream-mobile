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
		if (this.props.enrollSmall) {
			return (
				<Button
				  onPress={this.props.onPress}
				  style={ buttonStyles.enrollSmall }
				  textStyle={ textStyles.enrollSmall }
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
				  textStyle={ textStyles.buttonTextDark }
			  	>{this.props.text}</Button>
			);
		}
		if (this.props.variableButton) {
			const colorList = {
		      '#26A69A': '#B2DFDB',
		      '#3F51B5': '#CFD3EC',
		      '#7E57C2': '#DFD5F0',
		      '#C2185B': '#F3C6D6',
		      '#795548': '#E3DBD8',
		    }
			return (
				<Button
				  onPress={this.props.onPress}
				  style={ {backgroundColor: colorList[this.props.variableButton],
				    borderColor: colorList[this.props.variableButton],
				    marginRight: 16,
				    marginLeft: 16,}} 
				  textStyle={ {fontWeight: '500', fontSize: 16, color: this.props.variableButton} }
			  	>{this.props.text}</Button>
			);
		}
		if (this.props.secondaryButtonOutlineLarge) {
			return (
				<Button
				  onPress={this.props.onPress}
				  style={ buttonStyles.secondaryButtonOutlineLarge } 
				  textStyle={ textStyles.buttonTextDark }
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
