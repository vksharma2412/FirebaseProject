import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator, ImageBackground } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase';
import firebaseOld from 'firebase';
import uuid from 'uuid';

import { Button } from '../components/Button';
import { Strings as String } from '../components/Strings';
import { Colors as Color } from '../components/Colors'
import { Assets as Icon } from '../components/Assets'

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default class Browse extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      image: 'empty',

    }

  }

  componentDidMount() {
    var logedInUser = firebase.auth().currentUser.uid
    this.user_id = logedInUser;
  }

  imagePicker() {
    this.setState({ isLoading: true })
    ImagePicker.showImagePicker(options, (response) => {
      this.setState({ isLoading: false })
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        this.setState({
          image: source.uri,
        });
      }
    });

  }

  uploadImageAsync = async (uri, storageRef) => {
    const parts = uri.split(".");
    const fileExtenstion = parts[parts.length - 1];

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const ref = storageRef
      .child("photos")
      .child("userPhotos")
      .child(uuid.v4() + "." + fileExtenstion);
    const snapshot = await ref.put(blob);
    blob.close();
    return await snapshot.ref.getDownloadURL();
  };

  saveImages = async () => {
    console.log('saveImage call function')
    try {
      this.setState({ isLoading: true });
      const dbReference = firebase.database().ref(`Gallery/${this.user_id}`)
      const storageRef = firebaseOld.storage().ref();

      let downloadUrl;
      if (this.state.image !== "empty") {
        downloadUrl = await this.uploadImageAsync(this.state.image, storageRef);
        console.log('this is dowload Url', downloadUrl)
      }
      if (downloadUrl) {
        await dbReference.push(downloadUrl, error => {
          if (!error) {
            Alert.alert('Image has been Uploaded Sucessfully')
          }
        });
      }
      this.setState({ isLoading: false });
    } catch (error) {
      console.log(error)
    }

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
              <View style={styles.view1}>
                <View style={styles.view2}>
                  <TouchableOpacity
                    onPress={() => { this.imagePicker() }}>
                    <Text style={styles.text}>{String.textFields.pickImage}</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.view3}>
                  <TouchableOpacity
                    onPress={() => { this.saveImages() }}>
                    <Text style={styles.text}>{String.textFields.uploadImage}</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.view4}>
                  <TouchableOpacity
                    onPress={() => { this.props.navigateprops.navigation.navigate('BrowseImage') }}
                  >
                    <Text style={styles.text}>{String.textFields.browseImage}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.view6}>
                <Image style={styles.image}
                  source={{ uri: this.state.image }}
                />
              </View>
              {this.activityIndicator()}
            </View>
        </ImageBackground>
      </View>
    )
  }
}


const styles = StyleSheet.create({

  container: {

     flex: 1,
     justifyContent: 'center'

  },

  view1: {

     flex: .045,
     flexDirection: 'row',
     justifyContent: 'space-evenly',
    
  },

  view2: {

     backgroundColor: Color.backgColor,
     height: 30,
     width: 115,
     borderRadius: 5

  },

  view3: {

     backgroundColor: Color.backgColor,
     height: 30,
     width: 124,
     borderRadius: 5

  },

  view4: {

     backgroundColor: Color.backgColor,
     height: 30,
     width: 124,
     borderRadius: 5

  },

  view6: {

     flex: .905,
     marginLeft: 1

  },

  text: { 

     color: 'white',
     fontSize: 18,
     fontWeight: 'bold',
     textAlign: 'center',
     marginTop: 2

  },

  text2: {

     color: Color.backgColor,
     fontSize: 18,
     fontWeight: 'bold'

  },

  image: {

     height: 648,
     width: '99.5%',
     borderRadius: 1

  },

  progress: {

     ...StyleSheet.absoluteFill,
     backgroundColor: 'rgba(0, 0, 0, 0.4)',
     justifyContent: 'center',
     alignItems: 'center'

  },

  usersList: {

     width: '100%',
     height: '100%'

  }

})