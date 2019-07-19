import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity,FlatList} from 'react-native';
import { Card, CardItem } from "native-base";
import firebase from 'firebase';
import newFirebase from 'react-native-firebase'

import { Assets as Icon } from '../components/Assets';
import { Strings as String } from '../components/Strings';
import { Colors as Color } from '../components/Colors'

export default class Followers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
       dataSource:[],
       followingById:''
    }
  }
  componentDidMount() {

     var logedInUser = newFirebase.auth().currentUser.uid
     this.uid = logedInUser
     this.id = this.props.navigation.getParam('followers_Id')
    setTimeout(()=>{
      this.fetchFollowersList()
    },2500)
   
  }

fetchFollowersList =() => {
       let finalData=[]
       firebase.database().ref(`users/${this.id}/followers`).on('value', (snapshot) => {
       snapshot.forEach((child) => {
       data = Object.values(snapshot.val());
       finalData.push(data)
       this.setState({dataSource: finalData[0]},()=>{
         console.log('this is cheking of followers data',this.state.dataSource);
         
       })
       });
    });
  }
  _renderItem = (item, index) => {
    return (
      <View>
          <Card>
            <CardItem style={styles.cardItem}>
              <View>
                <View style={styles.userPic}>
                  <Image
                     style={styles.profilepic}
                     source={{
                      uri: item.url
                    }}
                  />
                </View>

                <View style={styles.userinfo}>
                   <Text style={styles.userInfoText}>Name:{item.name}</Text>
                   <Text style={styles.userInfoText}>Email:{item.email}</Text>
                </View>
              </View>
            </CardItem>
          </Card>
       
      </View>

    )

  }

  render() {
  
    return (
      <View>
          <ImageBackground
             source={Icon.images.usersListingB}
             style={styles.usersList}
           >
            <View style={styles.container}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                style={{ padding: 10, position: 'absolute', left: 0, top: 20, Index: 10 }}>
                <Image
                  source={Icon.icons.back}
                  style={{ height: 25, width: 25, marginLeft: 10, marginTop: 24, backgroundColor: Color.backgColor, tintColor: Color.textColor }}
                >
                </Image>
              </TouchableOpacity>

              <View style={styles.view1}>
                <Text style={styles.text}>
                   {String.textFields.followersLists}
                </Text>
              </View>
              <FlatList
                 numColumns={1}
                 data={this.state.dataSource}
                 renderItem={({ item, index }) => this._renderItem(item, index)}
                 keyExtractor={(item, index) => `${index}_users`}
              />
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

     color: Color.textColor,
     fontWeight: 'bold',
     textAlign:'center',
     fontSize: 20,
      marginTop:2

  },

  view1: {

     backgroundColor: Color.backgColor,
     height: 30,
     width: 200,
     borderRadius: 8,
     marginTop: 70,
     marginLeft: 93

  },

  followers: {

     width: '100%',
     height: '100%'

  },

  cardItem: {

     backgroundColor:Color.cardColor,
      
  },

  userPic: {

     flex: .6,
     alignItems: 'center'

  },

  profilepic: {

     height: 140,
     width: 150,
     borderRadius: 75

  }, 

  userinfo: {

     flex: .4,
     marginBottom: 10

},

userInfoText: {

     fontSize: 18,
     fontWeight: 'bold',
     color: Color.backgColor,
     textAlign: 'center'

},

usersList: {

    width:'100%',
    height:'100%'

} 
})