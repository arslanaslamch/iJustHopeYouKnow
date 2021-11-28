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
    FlatList,
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



const ViewLetter = ({navigation}) => {
    const [data, setData] = useState([]);
    const [check_indicator, setShowIndView] = useState(true);
    const getAllLetter = async() => {
        
        axios.get("https://cybrillcodex.com/appcode/fetchLetters.php?userid="+global.UsersID)
        
        .then((resJson) => { console.log(resJson); setData(resJson.data) })
        .catch(console.error)
        .finally(() => setShowIndView(false));
    }
    useEffect(() => {
      setShowIndView(true);
      getAllLetter();
      return () => {

      }
    }, [])

    const { colors } = useTheme();
    const renderLetters = ({item}) => {
      const ViewLetterDetails = () => {
        global.LetterID = item.ID;
        navigation.navigate("ViewSingleLetter");
        
      }
      const DeleteLetter = () => {
        global.LetterID = item.ID;
        navigation.navigate("DeleteLetter");
      }
      return(
        <View style={styles.singleLetter}>
                <Text style={styles.letterTo}>
                  <Text style={styles.letterToBold}>Name:</Text> {item.recipientname}
                </Text>
                <Text style={styles.letterTo}>
                  <Text style={styles.letterToBold}>Email:</Text> {item.recipientemail}
                </Text>
                <Text style={styles.letterTo}>
                  <Text style={styles.letterToBold}>Letter Message:</Text> {'\n \n'}{item.recipientmessage}
                </Text>
                <View style={styles.letterIcons}>
                    <TouchableOpacity style={styles.iconDef} onPress={() => DeleteLetter(item)}>
                        <View style={styles.sngIco}>
                          <MaterialIcons 
                              name="delete"
                              color="red"
                              size={20}
                              style={styles.iconDelete}
                          />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconDef} onPress={() => ViewLetterDetails(item)}>
                        <View style={styles.sngIco}>
                          <MaterialIcons 
                              name="visibility"
                              color="white"
                              size={20}
                              style={styles.iconView}
                          />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconDef}>
                        <View style={styles.sngIco}>
                          <MaterialIcons 
                              name="edit"
                              color="white"
                              size={20}
                              style={styles.iconEdit}
                          />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconDef}>
                        <View style={styles.sngIco}>
                          <MaterialIcons 
                              name="thumb-up"
                              color="white"
                              size={20}
                              style={styles.iconApproved}
                          />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
      )
    }
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
            
            <FlatList
              data={data}
              keyExtractor={item => `key-${item.ID}`}
              renderItem={renderLetters}
            /> 
           

        </SafeAreaView>
      </View>
    );
};

export default ViewLetter;

const {height} = Dimensions.get("screen");
const {width} = Dimensions.get("screen");
const height_logo = height * 0.20;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#0b355d',
    paddingBottom: 100,
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