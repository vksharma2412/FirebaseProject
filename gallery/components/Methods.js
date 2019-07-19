import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground,FlatList} from 'react-native';
import { Card, CardItem } from "native-base";

import { Strings as String } from '../components/Strings';
import { Colors as Color } from '../components/Colors';
import { Assets as Icon } from '../components/Assets';

export default class Connection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
          dataSource:[]
         };
       }

       componentDidMount(){
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then((responseJson)=> {
        this.setState({
             loading: false,
             dataSource: splice(responseJson)
          })
        })
        .catch(error=>console.log(error)) //to catch the errors if any
        }
        _renderItem = (item, index) => {
            return (
                <View>
    
                    {item.id === this.uid ?
                        null :
                        <Card>
                            <CardItem style={styles.cardItem}>
                                    <View style={styles.userinfo}>
                                        <Text style={styles.userInfoText}>Name:{item.name}</Text>
                                        <Text style={styles.userInfoText}>Email:{item.email}</Text>
                                        <Text style={styles.userInfoText}>Adress:{item.address.street}</Text>
                                        <Text style={styles.userInfoText}>{item.address.suite}</Text>
                                        <Text style={styles.userInfoText}>{item.address.city}</Text>
                                        <Text style={styles.userInfoText}>{item.address.zipcode}</Text>
                                      
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
          <View style={styles.container}>
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
         height: 20,
         width: 105,
         borderRadius: 5,
         marginLeft: 44,
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
         marginBottom: 10

    },

    userInfoText: {

         fontSize: 18,
         fontWeight: 'bold',
         color: Color.backgColor,
         textAlign: 'center'

    },

    profilepic:
    {
         height: 140,
         width: 150,
         borderRadius: 75

    },

    userPic: {

         flex: .2,
         alignItems: 'center'

    },

    button1: {

         flex: .25,
         flexDirection: 'row',
         justifyContent: 'space-evenly'

    },

    button2: {

         flex: .25,
         flexDirection: 'row',
         justifyContent: 'space-evenly'



    },

    buttonText1: {

         fontSize: 16,
         fontWeight: 'bold',
         color: Color.textColor,
         textAlign: 'center',
         marginBottom: 1

    },
    
    cardItem: {

         backgroundColor:Color.cardColor,
        
    },
    usersList: {

         width:'100%',
         height:'100%'
         
    },
   


})