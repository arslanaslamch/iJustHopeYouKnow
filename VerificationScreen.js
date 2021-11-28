import React, {useState, useEffect} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet,
    Dimensions,
    StatusBar,
    Alert,
    Image,
    ActivityIndicator
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import axios from 'axios';
import SweetAlert from 'react-native-sweet-alert';
import { AsyncStorage } from 'react-native';

const VerificationScreen = ({navigation}) => {
    const { colors } = useTheme();
    
    return (

      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
            
        <View style={styles.header}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            source={require('../assets/logos/logo.jpeg')}
            style={styles.logo}
            resizeMode="stretch"
            />
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
            <Animatable.View animation="bounceIn" style={styles.Verificationicons}>
                <Ionicons name="ios-warning" style={styles.warningIcon} />
                <Text style={styles.verificationHeading}>
                    Verifiy Your Account...!
                </Text>
                <Text style={styles.alignCenter}>
                    <Text style={styles.verificationDescription}>
                        A Verification Email has been sent to your email address. Please verify your email to use our application's account. {"\n"}
                    </Text>
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('SignInScreen')}
                    style={[styles.signIn, {
                        borderColor: '#0b355d',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#0b355d'
                    }]}>Sign In</Text>
                </TouchableOpacity>
            </Animatable.View>
        </Animatable.View>
      </View>
    );
};

export default VerificationScreen;
const {height} = Dimensions.get("screen");
const {width} = Dimensions.get("screen");
const height_logo = height * 0.20;
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#0b355d'
    },
    header: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Verificationicons: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    warningIcon: {
        fontSize: 100,
        paddingTop: 40,
        color: '#0b355d',
    },
    verificationHeading: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#0b355d',
        marginTop: 20,
    },
    alignCenter: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        
        textAlign: 'center'
    },
    verificationDescription: {
        fontSize: 15,
        fontWeight: 'bold',
        lineHeight: 23,
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    logo: {
      width: height_logo,
      height: height_logo
    },
    signIn: {
        width: '100%',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',

    }
    
  });