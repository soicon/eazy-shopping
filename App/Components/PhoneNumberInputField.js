import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import styles from './Styles/TextInputFieldStyle'
import { Colors } from '../Themes'
import I18n from 'react-native-i18n'
import PhoneInput from 'react-native-phone-input'


export default class PhoneNumberInputField extends React.Component {
  static defaultProps = {
    containerStyle: {
      width: 300
    },
    styles: { color: 'white' }
  }

  render() {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <View style={{ flexDirection: I18n.t('direction') }}>
          <Text style={[styles.title, this.props.titleStyle]}>{this.props.title}</Text>
          {this.props.required ?
            <Text style={[styles.title, { color: Colors.green }]}> *</Text>
            : null
          }
        </View>
        <View style={[{ borderBottomColor: '#E9E9E9'}, this.props.textInputStyle]}>
          <PhoneInput
                ref={ref => {
                  this.phone = ref;
                }}
                keyboardType='numeric'
                value={this.props.phone}
                initialCountry='vn'
                cancelText='Cancel'
                textStyle={{fontSize: 20,color:'white'}}
                onChangePhoneNumber={this.props.onChangePhoneNumber}

          />

        </View>
        {
          this.props.error  ? <Text style={styles.error}>{this.props.errorMessage}</Text>
            : null
        }
        {this.props.validMessage  ? <Text style={styles.valid}>{this.props.validMessage}</Text> : null}
      </View>
    )
  }
}

// // Prop type warnings
// TextInputField.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// TextInputField.defaultProps = {
//   someSetting: false
// }
