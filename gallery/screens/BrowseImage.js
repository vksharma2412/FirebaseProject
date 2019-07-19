import React, { Component } from 'react';
import { navigation } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ActivityIndicator,ImageBackground } from 'react-native';
import { Card, CardItem } from "native-base";
import firebase from 'react-native-firebase';

import { Assets as Icon } from '../components/Assets';
import { Strings as String } from '../components/Strings';
import { Colors as Color } from '../components/Colors';

export default class BrowseImage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            imageUrl: [],
        }

    }

    componentDidMount(){
        var logedInUser =firebase.auth().currentUser.uid
        this.uid=logedInUser
        console.log('firebase uid9878878978978978879879878979789789779879',this.uid)
        this.getCurrentUserImageUrl();
        
    }

    getCurrentUserImageUrl = () => {
        firebase.database().ref(`Gallery/${this.uid}`).on('value', (snapshot) => {
            let finalData = []
            snapshot.forEach((child) => {
            const imageURL = child.val()
            console.log("1111111111",imageURL)
            finalData.push(imageURL);    
            });

           this.setState({imageUrl:finalData},()=>{
               console.log('this is final user id111111111111111111',this.state.imageUrl)
               console.log('this is final user id with stringy1111111111111111sssssssssss',JSON.stringify(this.state.imageUrl))
           }
            )
        });
    }

    _renderItem = (item, index) => {
        return (
            <View>
                <Card>
                    <CardItem>
                        <View >
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ isLoading: true });
                                    this.props.navigation.navigate('Carousel',
                                        { userInfo: this.state.imageUrl })
                                    this.setState({ isLoading:false })
                                }}
                            >
                                <Image
                                    style={styles.gallerypic}
                                    source={{
                                        uri: item
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    </CardItem>
                </Card>
            </View>
        )
    }

    activityIndicator = () => {
        if (this.state.isLoading) {
          return (
            <View style={styles.progress}>
              <ActivityIndicator size='large' color="#01CBC6" />
              <Text style={styles.text2}>{String.textFields.activityIndicator}</Text>
            </View>
          );
        } else return null
    
      }

    render() {
       return (
           <View>
                 <ImageBackground
                    source={Icon.images.usersListingB}
                    style={styles.usersList}
                >
          
                    <View style={styles.container}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                            style={{ padding: 10, position: 'absolute', left: 0, top: 20, zIndex: 10 }}>
                            <Image
                                source={Icon.icons.back}
                                style={{ height: 25, width: 25, marginLeft: 10, marginTop: 24, backgroundColor: Color.backgColor, tintColor:Color.textColor}}
                            />
                        </TouchableOpacity>

                        <View style={styles.view1}>
                            <Text style={styles.text1}>{String.textFields.title}</Text>
                        </View >

                        <View>
                            <FlatList
                                numColumns={3}
                                data={this.state.imageUrl}
                                renderItem={({ item, index }) => this._renderItem(item, index)}
                                keyExtractor={(item, index) => `${index}_image`}
                            />
                        </View>
              
                        </View>
                 </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {

         flex: 1,

    },

    view1: {

         backgroundColor: Color.backgColor,
         height: 30,
         width: 200,
         borderRadius: 8,
         marginTop: 70,
         marginLeft: 93


    },

    text1: {

         color: Color.textColor,
         fontWeight: 'bold',
         fontSize: 20,
         marginTop: 2,
         textAlign: 'center'

    },
    gallerypic: { 

         height: 87,
         width: 87,
         marginRight: 5,
         marginTop: 10,
         backgroundColor: Color.backgColor

    },
    progress: {

         ...StyleSheet.absoluteFill,
         backgroundColor: 'rgba(0, 0, 0, 0.4)',
         justifyContent: 'center',
         alignItems: 'center'

      },
      
    usersList: {

      width:'100%',
      height:'100%'

  }

})