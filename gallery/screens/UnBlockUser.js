import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, FlatList, ImageBackground,Asy } from 'react-native';
import firebase from 'firebase'
import { Card, CardItem } from "native-base";
import newFirebase from 'react-native-firebase'

import { Strings as String } from '../components/Strings';
import { Colors as Color } from '../components/Colors';
import { Assets as Icon } from '../components/Assets';

export default class UnBlockUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
             
                    dataSource:[]

        }
    }

    componentWillMount() {

         this.finalData=[];
         var logedInUser = newFirebase.auth().currentUser.uid;
         this.uid = logedInUser
         this.data=this.props.navigation.state.params;
         this.finalData.push(this.data);
         this.fetchUsersDetails()
      
    }

    fetchUsersDetails = () => {
        firebase.database().ref(`users/${this.uid}/BlockedUsers`).on('value', (snapshot) => {
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
  
    // userUnBlock(id,email,name,url) {
    //      const dbRef = newFirebase.database().ref(`users/${id}`);
    //      dbRef.set({

    //          name:name,
    //          email:email,
    //          id:id,
    //          url:url

    //     })
    //    this.removeUsersFromBlockedUsersNode(id)
    // }

     removeUsersFromBlockedUsersNode(id){

         const dbRef = newFirebase.database().ref(`users/${this.uid}/BlockedUsers`);
         dbRef.child(id).set(null)

     }
    _renderItem = (item, index) => {
        return (
            <View>
                {item.id === this.uid ?
                    null :
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

                                <View style={styles.button1}>
                                    <View style={styles.view2}>
                                        <TouchableOpacity
                                            onPress={() => { this.removeUsersFromBlockedUsersNode(item.id) }}
                                        >
                                            <Text style={styles.buttonText1}>{String.textFields.unBlockButton}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </CardItem>
                    </Card>
                }
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
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                        style={{ padding: 10, position: 'absolute', left: 0, top: 20, zIndex: 10 }}>
                        <Image
                            source={Icon.icons.back}
                            style={{ height: 25, width: 25, marginLeft: 10, marginTop: 24, backgroundColor: Color.backgColor, tintColor: Color.textColor }}
                        />
                    </TouchableOpacity>

                    <View style={styles.container}>
                        <View style={styles.titleView}>
                            <Text style={styles.text1}>{String.textFields.unBlockTitle}</Text>
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
        )
    }
}

const styles = StyleSheet.create({

    container: {

         flex: 1

    },

    titleView: {

         backgroundColor: Color.backgColor,
         height: 30,
         width: 200,
         borderRadius: 8,
         marginTop: 70,
         marginLeft: 93

    },

    view2: {

         backgroundColor: Color.backgColor,
         height: 30,
         width: 124,
         borderRadius: 5,
         marginLeft: 108,
         marginTop: 10
         
    },

    text1: {

         color: Color.textColor,
         fontWeight: 'bold',
         fontSize: 18,
         marginTop: 2,
         textAlign: 'center'

    },

    userinfo: {

        flex: .3,
        marginBottom: 10,
      

    },

    userInfoText: {

         fontSize: 18,
         fontWeight: 'bold',
         color: Color.backgColor,
         marginLeft:70

    },

    profilepic:
    {
         height: 140,
         width: 150,
         borderRadius: 75,
         marginLeft:55

    },

    userPic: {

         flex: .2,
         alignItems: 'center'

    },

    button1: { 

         flex: .25,
        
    },
   
    buttonText1: {

         fontSize: 16,
         fontWeight: 'bold',
         color: Color.textColor,
         textAlign: 'center',
         marginTop:4
         

    },
    
    cardItem: {

         backgroundColor:Color.cardColor,
        
    },

    usersList: {

         width:'100%',
         height:'100%'

    }

})