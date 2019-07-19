import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity} from 'react-native';
import { LoginManager } from "react-native-fbsdk"
import firebase from 'react-native-firebase';

import { Assets as Icon } from '../components/Assets';
import { Button } from '../components/Button'
import { Strings as string } from '../components/Strings';
import { Colors as Color } from '../components/Colors';

export default class Setting extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Setting',
    drawerIcon: () => (
      <Image source={require('../components/icons/setting.png')} />
    ),
  }

  signOutUser = async () => {
    try {
      await firebase.auth().signOut();
      await LoginManager.logOut()

    } catch (e) {
      console.log(e);
    }
    this.props.navigateprops.navigation.navigate('LogIn')
  }

  render() {
    return (
      <View>
        <ImageBackground
          source={Icon.images.usersListingB}
           style={styles.usersList}
        >
          <View>
            <View style={styles.view1}>
              <Text style={styles.text}>{string.textFields.setting}</Text>
            </View>
          </View>

          <View >
            <View style={styles.container}>
              <ImageBackground source={Icon.icons.setting} style={styles.image1}>
                <View style={styles.mainview}>
                  <View style={styles.subMainView}>
                    <View style={styles.view4}>
                      <TouchableOpacity
                          onPress={() =>this.props.navigateprops.navigation.navigate('BlockUser')}
                      >
                          <Text style={styles.text1}>  {string.textFields.blockButtonSetting}</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.view5}>
                      <TouchableOpacity
                          onPress={this.signOutUser}
                      >
                          <Text style={styles.text1}> {string.textFields.logOut}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({

  container: {

     flex: 1,
     justifyContent: 'center',
     marginTop: 130

  },
 
  view4: {

     backgroundColor: Color.backgColor,
     height: 30,
     width: 114,
     borderRadius: 5,
     alignSelf:'center',
     marginLeft:15

  },

  view5: {

     backgroundColor: Color.backgColor,
     height: 30,
     width: 114,
     borderRadius: 5,
     alignSelf:'center',
     marginLeft:122
    
  },

  image1:{

     height: 378,
     width: 378,
     alignSelf: 'center',

  },

  mainview: {

     marginTop: 175,
    
  },

  subMainView:{

    flexDirection:'row'

  },

  text: {

     color: Color.textColor,
     fontWeight: 'bold',
     textAlign:'center',
     fontSize: 20

  },

  text1: {

     color: 'white',
     fontSize: 20,
     fontWeight: 'bold',
     textAlign: 'center',
     marginTop: 2

  },

  view1:
  {

     backgroundColor: Color.backgColor,
     height: 30,
     width: '70%',
     justifyContent: 'center',
     alignItems: 'center',
     borderRadius: 8,
     marginLeft: 65,
     marginBottom: 180

  },

  usersList: {

     width:'100%',
     height:'100%'

  }
})