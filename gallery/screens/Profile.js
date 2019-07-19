import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground ,TouchableOpacity} from 'react-native';

import { Strings as String } from '../components/Strings';
import { Colors as Color } from '../components/Colors';
import { Assets as Icon } from '../components/Assets';


export default class Connection extends React.Component {
  render() {
    return (
      <View>
        <ImageBackground
           source={Icon.images.usersListingB}
           style={styles.usersList}
        >
          <View style={styles.container}>
            <View style={styles.view1}>
              <TouchableOpacity
                onPress={() =>this.props.navigateprops.navigation.navigate('CurrentUserProfile')}
              >
                <Text style={styles.text}>{String.textFields.CurrentUserProfileButton}</Text>
              </TouchableOpacity>
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
   
  },

  text: {

     color: 'white',
     fontSize: 18,
     fontWeight: 'bold',
     textAlign: 'center',
     marginTop: 3

   },

   view1: {

     backgroundColor: Color.backgColor,
     height: 30,
     width: 200,
     borderRadius: 8,
     alignSelf:'center',
     marginTop:1

  },
  usersList: {

       width:'100%',
       height:'100%'

  }
  
})