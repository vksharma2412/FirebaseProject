import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';
import { Swiper, TitleBar, TabBar } from 'react-native-awesome-viewpager';

import { Button } from '../components/Button';
import Browse from './Browse';
import Connection from './Connection';
import Profile from './Profile';
import Setting from './Setting';
import { Strings as String } from '../components/Strings';
import { Colors as Color } from '../components/Colors'
import { Assets as icon } from '../components/Assets';

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    state = {
      scrollEnabled: true,
      type: 1,
    }
  }
  render() {
    return (
      <View style={styles.containerMain}>
          <TitleBar
             style={styles.container}
             titles={['Browse', 'Connection', 'Profile', 'Setting']}>
            <View>
               <Browse navigateprops={this.props} />
            </View>
           
            <View >
            <Connection navigateprops={this.props}/>
            </View>

            <View style={styles.view3}>
              <Profile navigateprops={this.props} />
            </View>

            <View style={styles.view4}>
              <Setting navigateprops={this.props} />
            </View>
          </TitleBar>
      </View>



    )
  }

}

const styles = StyleSheet.create({

  containerMain: {
    
     flex: 1,

  },
  
  container: {

     flex: 1,
     backgroundColor: Color.textColor,
     flexDirection: 'column',
     paddingTop: 20

  },

  text: {

     color: Color.textColor,
     fontSize: 18,
     fontWeight: 'bold',
     textAlign: 'center',
     marginTop: 2 

  },

  view1: {

     backgroundColor: Color.backgColor,
     borderRadius: 5,
     height:30,
     width:124,
     alignSelf:'center',
     marginTop:1

  },

  usersList: {

     width:'100%',
     height:'100%'

  }
});