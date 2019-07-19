import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, SafeAreaView, TouchableOpacity, FlatList ,ImageBackground} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { SliderBox } from 'react-native-image-slider-box';

import { Assets as Icon } from '../components/Assets';
import { Strings as String } from '../components/Strings';
import { Colors as Color } from '../components/Colors'

export default class Carousel1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],

    }
  }

  componentDidMount() {
    this.setState(
      {
        dataSource: this.props.navigation.state.params.userInfo
      }
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
                <SafeAreaView style={styles.container}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                       style={{ padding: 10, position: 'absolute', left: 0, top: 20, zIndex: 10 }}
                    >
                      <Image source={Icon.icons.back}
                        style={{ height: 25, width: 25, marginLeft: 10, marginTop: 24, backgroundColor: Color.backgColor, tintColor: Color.textColor }}
                      />
                    </TouchableOpacity>

                    <View style={styles.view1}>
                       <Text style={styles.text1}>{String.textFields.title}</Text>
                    </View >

                    <SliderBox
                       images={this.state.dataSource}
                       sliderBoxHeight={660}
                       onCurrentImagePressed={index =>
                       console.warn(`image ${index} pressed`)
                      }
                       dotColor="#FFEE58"
                       inactiveDotColor="#90A4AE"
                       paginationBoxVerticalPadding={20}
                       circleLoop
                     />
                    {this.activityIndicator()}
                </SafeAreaView>
           </ImageBackground>
       </View>
    );
  }
}


const styles = StyleSheet.create({

  container: {

    flex: 1,
    alignItems: 'center',

  },

  view1: {

     backgroundColor: Color.backgColor,
     height: 30,
     width: 200,
     borderRadius: 8,
     marginTop: 30

  },

  text1: {

     color: Color.textColor,
     fontWeight: 'bold',
     fontSize: 20,
     marginTop: 2,
     textAlign: 'center'

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
});