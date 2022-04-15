'use strict';
import React , { useEffect , useState}from 'react';
import {

  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  NativeModules
} from 'react-native';

import TouchID from "react-native-touch-id";

const App = () => {




  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF'
    },
    welcome: {
      margin: 10,
      fontSize: 20,
      fontWeight: '600',
      textAlign: 'center'
    },
    instructions: {
      marginBottom: 5,
      color: '#333333',
      fontSize: 13,
      textAlign: 'center'
    },
    btn: {
      borderRadius: 3,
      marginTop: 200,
      paddingTop: 15,
      paddingBottom: 15,
      paddingLeft: 15,
      paddingRight: 15,
      backgroundColor: '#0391D7'
    }
  });

  const errors = {
    "LAErrorAuthenticationFailed": "Authentication was not successful because the user failed to provide valid credentials.",
    "LAErrorUserCancel": "Authentication was canceled by the user—for example, the user tapped Cancel in the dialog.",
    "LAErrorUserFallback": "Authentication was canceled because the user tapped the fallback button (Enter Password).",
    "LAErrorSystemCancel": "Authentication was canceled by system—for example, if another application came to foreground while the authentication dialog was up.",
    "LAErrorPasscodeNotSet": "Authentication could not start because the passcode is not set on the device.",
    "LAErrorTouchIDNotAvailable": "Authentication could not start because Touch ID is not available on the device",
    "LAErrorTouchIDNotEnrolled": "Authentication could not start because Touch ID has no enrolled fingers.",
    "RCTTouchIDUnknownError": "Could not authenticate for an unknown reason.",
    "RCTTouchIDNotSupported": "Device does not support Touch ID."
  };

  const [biometryType, setBiometryType] = useState(null);
  const [succeed, setSucceed] = useState(false);



  useEffect(() => {
    TouchID.isSupported()
      .then(biometryType => {
        setBiometryType(biometryType);
      })
  }, [])


  const _clickHandler = () => {
    TouchID.isSupported()
      .then(authenticate)
      .catch(error => {
      });
  }
  const authenticate = () => {
    return TouchID.authenticate()
      .then(success => {

        setSucceed(true)
        console.log(succeed)
      })
      .catch(error => {

        setSucceed(false)
        console.log(error)
      });
  }


  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Touch ID/ Face ID avec React Native
      </Text>

      <Text style={styles.instructions}>
        Veille technologique
      </Text>

      <Text>{succeed ? "Authentification réussié" : "Echec"}</Text>


      <TouchableHighlight
        style={styles.btn}
        onPress={()=>_clickHandler()}
        underlayColor="#0380BE"
        activeOpacity={1}
      >
        <Text style={{
          color: '#fff',
          fontWeight: '600'
        }}>
          {`S'authentifier avec ${biometryType}`}
        </Text>
      </TouchableHighlight>
    </View>
  );



}

export default App;





/* function passcodeAuth() {
  return PasscodeAuth.isSupported()
    .then(() => {
      return PasscodeAuth.authenticate()
    })
    .then(success => {
    })
    .catch(error => {
      console.log(error)
    });
} */