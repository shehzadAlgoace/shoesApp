/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  Animated,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {drawerItems, shoesBox} from '../data';

const DrawerScreen = () => {
  // state
  const [showMenu, setShowMenu] = useState(false);
  const moveToRight = useRef(new Animated.Value(1)).current; // 1 mean  100%
  const scale = useRef(new Animated.Value(1)).current; // different
  return (
    <View style={styles.mainContainer}>
      <View style={{flex: 1, backgroundColor: '#1B2530'}}>
        <View style={styles.profileContainer}>
          <Image
            resizeMode="contain"
            style={{
              width: 65,
              height: 65,
              marginLeft: 7,
              marginTop: 20,
              borderRadius: 50,
            }}
            source={require('../img/logo.png')}
          />
          <View>
            <Text style={styles.welcome}>Hey,👋</Text>
            <Text style={styles.userName}>Malik Shehzad</Text>
          </View>
        </View>
        {/* drawer Screen */}
        <View style={{marginVertical: 22}}>
          <FlatList
            data={drawerItems}
            renderItem={({item}) => {
              return (
                <TouchableOpacity style={styles.listMain}>
                  <Image source={item.icon} />
                  <Text style={styles.listText}>{item.title}</Text>
                </TouchableOpacity>
              );
            }}
          />
          <View
            style={{
              height: 1,
              width: '40%',
              flexDirection: 'row',
              backgroundColor: '#2D3B48',
              marginVertical: 55,
              marginLeft: 30,
            }}
          />
          <View style={styles.logoutStyle}>
            <Image source={require('../img/logOut.png')} />
            <Text style={styles.logoutText}>Logout</Text>
          </View>
        </View>
      </View>
      <Animated.View
        style={[
          {transform: [{scale: scale}, {translateX: moveToRight}]},
          styles.container,
          {
            borderRadius: showMenu ? 15 : 0,
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 50,
            justifyContent: 'space-between',
            backgroundColor: 'pink',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            // style={{ }}
            onPress={() => {
              Animated.timing(scale, {
                toValue: showMenu ? 1 : 0.8,
                duration: 300,
                useNativeDriver: true, // for performance or running natively
              }).start();
              Animated.timing(moveToRight, {
                toValue: showMenu ? 0 : 230,
                duration: 300,
                useNativeDriver: true, // for performance or running natively
              }).start();
              setShowMenu(!showMenu);
            }}>
            <Image
              source={require('../img/manu.png')}
              style={{width: 40, height: 40}}
            />
          </TouchableOpacity>
          <View style={{backgroundColor: 'coral', alignItems: 'center'}}>
            <Text>store location</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={require('../img/location.png')} />
              <Text style={styles.locationText}>Mondolibug, Sylhet</Text>
            </View>
          </View>
          <Image source={require('../img/cartlogo.png')} />
        </View>
        {/* search bar */}
        <View style={styles.searchBar}>
          <Image source={require('../img/searchIcon.png')} />
          <TextInput placeholder="Search" style={styles.searchInput} />
        </View>
        {/* Title of shoes */}
        <View style={styles.titleContainer}>
          <Text style={styles.listTitle}> Popular Shoes </Text>
          <Text style={styles.seeAllText}>see all</Text>
        </View>
        <View>
          <FlatList
            data={shoesBox}
            renderItem={({item}) => {
              return (
                <View>
                  <Image source={item.img} />
                  <Text>{item.tag}</Text>
                  <Text style={styles.listTitle}>{item.title}</Text>
                  <View>
                    <Text>{item.price}</Text>
                    <Image source={require('../img/addBtn.png')} />
                  </View>
                </View>
              );
            }}
          />
        </View>
      </Animated.View>
    </View>
  );
};

export default DrawerScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#1B2530',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#F8F9F1',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  profileContainer: {
    paddingLeft: 12,
    paddingTop: 22,
  },
  userName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  welcome: {
    color: '#707B81',
    fontSize: 15,
    fontWeight: 'medium',
    marginLeft: 10,
    marginTop: 10,
  },
  listMain: {
    // backgroundColor: '#2E384D',
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  listText: {
    color: 'white',
    marginLeft: 20,
    fontSize: 18,
  },
  logoutStyle: {
    marginLeft: 20,
    flexDirection: 'row',
  },
  logoutText: {
    color: 'white',
    marginLeft: 20,
    fontSize: 18,
  },
  locationText: {
    color: 'black',
    fontSize: 13,
    fontWeight: '600',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 22,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  searchInput: {
    backgroundColor: 'coral',
    width: '87%',
    marginLeft: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 25,
    alignItems: 'center',
  },
  listTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAllText: {
    color: '#5B9EE1',
    fontSize: 18,
    fontWeight: '500',
  },
});
