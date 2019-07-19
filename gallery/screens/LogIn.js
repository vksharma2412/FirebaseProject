
import { NavigationActions } from 'react-navigation';
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, ActivityIndicator, AppRegistry,ImageBackground} from 'react-native';
import firebase from 'react-native-firebase';
import { LoginManager, AccessToken } from "react-native-fbsdk";

import { Button } from '../components/Button';
import { Assets as Icon } from '../components/Assets';
import {Colors as Color} from '../components/Colors'

export default class LogIn extends React.Component {
  constructor(props) {
    super(props);
    LoginManager.setLoginBehavior('web')
    this.state = {

    }
  }

  componentDidMount() {
    this.fireBaseListener = firebase.auth().onAuthStateChanged(auth => {
      if (auth) {
        this.firebaseRef = firebase.database().ref('users/')
        this.firebaseRef.child(this.user_id).on('value', snap => {
          const user = snap.val()
          if (user != null) {
            this.firebaseRef.child(this.user_id).off('value')
          }
        })
      } else {
        this.setState({ showSpinner: false })
      }
    })

  }

  fbLogin = () => {
    LoginManager.logInWithReadPermissions(["public_profile"]).then(
      (result) => {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then(
            (accessTokenData) => {
              const credential = firebase.auth.FacebookAuthProvider.credential(accessTokenData.accessToken);

              firebase.auth().signInWithCredential(credential)
                .then(async (data) => {
                  let currentUser = firebase.auth().currentUser
                  console.log('\n\n\n>> Cred:\n', accessTokenData.accessToken)

                  console.log('\n\n\n>> currentUser:\n', currentUser)
                  let authToken = accessTokenData.accessToken

                  console.log(">> authToken:\n" + authToken);

                  await afterLoginComplete(authToken, currentUser)
                  this.props.navigation.navigate('Home');
                }).catch((error) => {
                  alert('[Firebase] Fb Signing failed' + error)
                });
            }
          )
          console.log(
            "Login success with permissions:" +
            result.grantedPermissions.toString()

          );
        }
      },
      function (error) {
        console.log("Login fail with error: " + error);
      }
    );

    const afterLoginComplete = async (token, currentUser) => {
      const response = await fetch(`https://graph.facebook.com/me?fields=id,name,first_name,last_name,gender,email,picture,cover&access_token=${token}`);
      let result = await response.json();
      console.log('this is data of user after fetchig  from ', JSON.stringify(result))


      console.log(">> currentUser:\n" + JSON.stringify(currentUser));

      const uid = currentUser.uid
      firebase.database().ref(`users/${uid}`).update(
        {
          "id": uid,
          "name": result.name,
          "email": result.email,
          "url": result.picture && result.picture.data && result.picture.data.url
        }
      ).then(() => {
        console.log('Inserted');
      }).catch((error) => {
        console.log(error);
      });

    }

  };

  render() {
    return (
      <View style={styles.container1}>
         <ImageBackground
             source={Icon.images.usersListingB}
             style={styles.usersList}
           >
               <View style={styles.container1}>
                  <View style={styles.container}>
                     <View style={styles.imageView}>
                         <Image  styles={styles.image} source={Icon.images.logIn} />
                     </View>

                     <View style={styles.button1}>
                       <Button
                           onPress={this.fbLogin}
                       >
                           Continue With Facebook
                        </Button>
                      </View>
                  </View>
               </View>
           </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  
  container: {

     padding: 70,
     paddingTop: 150

  },

  container1: {

     flex: 1,

  },

  button1:{

     paddingTop: 80

  },

  imageView: {

     borderBottomLeftRadius:160,
     borderBottomRightRadius:160,
     borderTopLeftRadius:160,
     borderTopRightRadius:160,
     overflow:"hidden"

  },

  image: {

     height:50,
     width:50,
     borderRadius:25


  },

  text: {

     fontSize: 25,
     fontWeight: 'bold',
     paddingTop: 50,
     paddingLeft: 50

  },

  usersList: { 

     width:'100%',
     height:'100%'

  }
})

