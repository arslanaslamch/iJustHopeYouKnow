import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    Image,
    AsyncStorage
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationContainer} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import TabsNavigation from './sections/TabNavigator';

const HomeScreen = ({navigation}) => {
    
    const { colors } = useTheme();
    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={[styles.headerDetails, styles.bold]}>I Just Hope You Know</Text>
        </View>
        <View style={styles.HomeWrapper}>
            <Text style={styles.HomeTitle}> Welcom Mr/Mis Arslan Aslam </Text>
            <Text style={styles.HomeDetails}> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </Text>
            <Text style={styles.HomeDetails}> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </Text>
        </View>
      </View>
    );
};

export default HomeScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.20;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#0b355d'
  },
  bold :{
    fontWeight: '900',
  },
  HomeWrapper: {
    padding: 20
  },
  HomeTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20,

  },
  HomeDetails: {
    color: 'white',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 10
  },
  header: {
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
  },
  headerDetails: {
      fontSize: 20,
      color: '#0b355d',
  },
  footer: {
      flex: 1,
      backgroundColor: 'red',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  
});