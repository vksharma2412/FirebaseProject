import React, {Component} from 'react';
import {StyleSheet, Text,TouchableOpacity} from 'react-native';
import {Colors as Color} from './Colors';
import {Strings as String} from './Strings';
import {Icons as Icon} from './Assets';

const Button=(props)=>{
     return (
        <TouchableOpacity onPress={props.onPress} style={styles.buttonBody}>
              <Text style={styles.buttonText}>
                 {props.children}
              </Text>
        </TouchableOpacity>
       );
    }
  
  const styles=StyleSheet.create({
    buttonBody:
      {  
          backgroundColor: Color.backgColor,
          alignItems:'center',
          justifyContent:'center',
          borderRadius:8,
          padding:10,
          width:'100%',

      },

    buttonText:
    {
       color:Color.textColor,
       fontSize:18,
       fontWeight:'bold'
    }
  }) ;
  export { Button }