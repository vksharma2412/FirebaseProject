import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity,FlatList} from 'react-native';
import { Card, CardItem } from "native-base";
import firebase from 'firebase';
import newFirebase from 'react-native-firebase'

import { Assets as Icon } from '../components/Assets';
import { Strings as String } from '../components/Strings';
import { Colors as Color } from '../components/Colors'

export default class Following extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
     
        dataSource:[]
    }
  }

  componentWillMount() {

     var logedInUser = newFirebase.auth().currentUser.uid
     this.uid = logedInUser
     this.fetchFollowingList()
   
  }

  fetchFollowingList =() => {
    firebase.database().ref(`users/${this.uid}/following`).on('value', (snapshot) => {
      let finalData = []
            snapshot.forEach((child) => {
                const data = Object.values(snapshot.val());
                finalData.push(data);
            });

            this.setState({ dataSource: finalData[0] }, () => {
               
            }
            )

    });
  }
  
  _renderItem = (item, index) => {
    return (
      <View>
          <Card>
            <CardItem style={styles.cardItem}>
              <View style={styles.insideCardItem}>
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
                   {String.textFields.followingList}
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
     borderRadius: 75,
     marginLeft:50

  }, 

  userinfo: {

     flex: .4,
     marginBottom: 10,
     marginLeft:40
    

},

userInfoText: {

     fontSize: 18,
     fontWeight: 'bold',
     color: Color.backgColor,
     marginLeft:40

},

usersList: {

    width:'100%',
    height:'100%'

} ,
insideCardItem:
{
  alignItems:'center'
}
})