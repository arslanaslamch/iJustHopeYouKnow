import React, {useState, useEffect} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    ScrollView,
    Image,
    ActivityIndicator,
    StatusBar,
    SafeAreaView,
    Animated
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationContainer} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import TabsNavigation from './sections/TabNavigator';
import axios from 'axios';



const ViewSingleLetter = ({navigation}) => {
    const [data, setData] = useState([]);
    const [check_indicator, setShowIndView] = useState(true);
    const getAllLetter = async() => {
        
        axios.get("https://cybrillcodex.com/appcode/SingleLetter.php?letterID="+global.LetterID)
        
        .then((resJson) => { console.log(resJson.data.recipientname); setData(resJson.data) })
        .catch(console.error)
        .finally(() => setShowIndView(false));
    }
    useEffect(() => {
      setShowIndView(true);
      getAllLetter();
    }, [])
    const { colors } = useTheme();
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#0b355d' barStyle="light-content"/>
          {check_indicator ?
          <View style={styles.indicatorArea}>
            <ActivityIndicator size="large" color="#0b355d" style={styles.indicator} />
          </View>
         : null }
        <View style={styles.header}>
            <Text style={[styles.headerDetails, styles.bold]}>I Just Hope You Know</Text>
        </View>
        <SafeAreaView style={styles.addLetter}>

            <Text style={styles.screen_heading}>Compose Letter</Text>
            
            <View style={styles.singleLetter}>
                <Text style={styles.letterTo}>
                  <Text style={styles.letterToBold}>Date & Time:</Text> {data.saveddate}
                </Text>
                <Text style={styles.letterTo}>
                  <Text style={styles.letterToBold}>Name:</Text> {data.recipientname}
                </Text>
                <Text style={styles.letterTo}>
                  <Text style={styles.letterToBold}>Email:</Text> {data.recipientemail}
                </Text>
                <Text style={styles.letterTo}>
                  <Text style={styles.letterToBold}>Letter Message:</Text> {'\n \n'}{data.recipientmessage}
                </Text>
                
            </View>
           

        </SafeAreaView>
      </View>
    );
};

export default ViewSingleLetter;

const {height} = Dimensions.get("screen");
const {width} = Dimensions.get("screen");
const height_logo = height * 0.20;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#0b355d'
  },
  letterTo: {
    color: 'white',
    padding: 5,
  },
  letterToBold: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'yellow',
  },
  singleLetter: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'white',
    marginTop: 25,
    padding: 20,
    borderRadius: 7,
    color: 'white',
  },
  addLetter: {
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 100,

  },
  screen_heading: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 30,
  },
  letterIcons: {
    width: '100%',
    marginTop: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bold :{
    fontWeight: '900',
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
  iconDef: {
    marginLeft: 10,
  },
  footer: {
      flex: 1,
      backgroundColor: 'red',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  iconDelete: {
    borderWidth: 1,
    borderColor: 'red',
    width: 40,
    height: 40,
    textAlign: 'center',
    lineHeight: 40,
    borderRadius: 100,
    backgroundColor: 'red',
    color: 'white',
  },
  iconView: {
    borderWidth: 1,
    borderColor: 'green',
    width: 40,
    height: 40,
    textAlign: 'center',
    lineHeight: 40,
    borderRadius: 100,
    backgroundColor: 'green',
    color: 'white',
  },
  iconEdit: {
    borderWidth: 1,
    borderColor: 'blue',
    width: 40,
    height: 40,
    textAlign: 'center',
    lineHeight: 40,
    borderRadius: 100,
    backgroundColor: '#0064DC',
    color: 'white',
  },
  iconApproved: {
    borderWidth: 1,
    borderColor: 'blue',
    width: 40,
    height: 40,
    textAlign: 'center',
    lineHeight: 40,
    borderRadius: 100,
    backgroundColor: '#A000DC',
    color: 'white',
  },
  
  sngIco: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 50,
  },
  iconText: {
    height: 40,
    lineHeight: 40,
    fontSize: 17,
    marginLeft: 5,
    marginRight: 10,
    fontWeight: 'bold'
  },
  indicator: {
        backgroundColor: "#ababab6e",
        width: 200,
        height: 200,
        borderRadius: 8,
        zIndex: 99,
    },
    indicatorArea: {
        position: 'absolute',
        backgroundColor: 'transparent',
        zIndex: 99,
        height: height,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
});