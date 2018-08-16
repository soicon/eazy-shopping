import React from 'react'
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import styles from './Styles/FullButtonStyles'
import PropTypes from 'prop-types';


export default class FullButton extends React.Component {
  static propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
    loading: PropTypes.bool,
    styles: PropTypes.object
  }

  render () {
    return (
      <TouchableOpacity disabled={this.props.disabled} style={[styles.button, this.props.style]} onPress={this.props.onPress}>
        {
          this.props.loading ? 
          <ActivityIndicator /> :
          <Text numberOfLines={this.props.numberOfLines} style={[styles.buttonText, this.props.styleText]}>{this.props.text}</Text> 
        }
      </TouchableOpacity>
    )
  }
}
