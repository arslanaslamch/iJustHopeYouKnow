import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationContainer} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';
import TabsNavigation from './sections/TabNavigator';

const SettingsScreen = ({navigation}) => {
    const { colors } = useTheme();

    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={[styles.headerDetails, styles.bold]}>I Just Hope You Know</Text>
        </View>
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor: '#0b355d',
            }]}
            animation="fadeInUpBig"
        >
        <View style={styles.navigationContainer}>
            <View style={styles.navigationLeft}>
                <TouchableOpacity style={styles.navigationBox} onPress={() => navigation.navigate("ProfileSetting")}>
                    <FontAwesome name="user-o" style={styles.navigationIco} />
                    <Text style={styles.navigationText}> Profile Settings </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navigationBox} onPress={() => navigation.navigate("ForgotPassword")}>
                    <FontAwesome name="lock" style={styles.navigationIco} />
                    <Text style={styles.navigationText}> Change Password </Text>
                </TouchableOpacity>
                

            </View>
            <View style={styles.navigationRight}>
                <TouchableOpacity style={styles.navigationBox}>
                    <Entypo name="newsletter" style={styles.navigationIco} />
                    <Text style={styles.navigationText}> System Settings </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navigationBoxlogOut} onPress={() => navigation.navigate("LogoutScreen")}>
                    <Ionicons name="log-out" style={styles.navigationIcolog} />
                    <Text style={styles.navigationTextlog}> Logout Account </Text>
                </TouchableOpacity>
            </View>
        </View>   
        </Animatable.View>

      </View>
    );
};

export default SettingsScreen;

const {height} = Dimensions.get("screen");
const {width} = Dimensions.get("screen");
const height_logo = height * 0.20;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b355d',
  },
  bold :{
    fontWeight: '900',
  },
  header: {
      flex: 0.10,
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
  },
  navigationContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
  },
  navigationLeft: {
    width: width / 2.25,
    paddingLeft: 5,
    paddingRight: 10,
  },
  navigationRight: {
    width: width / 2.25,
    paddingLeft: 10,
    paddingRight: 5,
  },
  navigationBox: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 150,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 10,
    borderRadius: 5,
  },
  navigationBoxlogOut: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    height: 150,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 10,
    borderRadius: 5,
  },
  navigationIco: {
      fontSize: 40,
      color: "#0b355d",
  },
  navigationText: {
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 10,
    color: "#0b355d",
  }, 
  navigationIcolog: {
    fontSize: 40,
      color: "white",
  },
  navigationTextlog: {
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 10,
    color: "white",
  }, 
});