//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, Icon, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import FAB from 'react-native-fab'
import styles from './style'
import RNGooglePlaces from 'react-native-google-places';
import Search from 'react-native-search-box';
import SearchResult from '@components/SearchResult'

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATTITUDE_DELTA = 0.004;
const LONGTITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO
let _this = null;
var searchText;

// create a component
class MapDetailPage extends Component {

  static navigationOptions = ({ navigation }) => ({

    header: ( /* Your custom header */
      <View style={styles.SectionStyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('@assets/images/backArrow.png')} style={styles.backArrow} />
        </TouchableOpacity>
        <Image source={require('@assets/images/search.png')} style={styles.ImageStyle} />
        <TextInput
          placeholder="Search"
          underlineColorAndroid='transparent'
          style={styles.textInput}
          onChangeText={(text) => _this._filterSearch(text)}
        // value={searchText}
        />
      </View>
    )
  });
  constructor(props) {
    super(props);
    this.state = {
      nearByPlaces: [],
      newNearByPlaces: [],
      title: '',
      address: '',
      isSearching: false,
      isSelected: false,
      searched: null,
      nearByPlacesPin: [],
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATTITUDE_DELTA,
        longitudeDelta: LONGTITUDE_DELTA,
      },
      initialMarker: {
        latitude: 0,
        longitude: 0,
      },
    }
  }
  componentDidMount() {
    _this = this;
  }
  componentWillMount() {
    RNGooglePlaces.getCurrentPlace()
      .then((results) => {
        console.log(results)
        var getInitialRegion = {
          latitude: results[0].latitude,
          longitude: results[0].longitude,
          latitudeDelta: LATTITUDE_DELTA,
          longitudeDelta: LONGTITUDE_DELTA,
        }
        var getInitialRegionMaker = {
          latitude: results[0].latitude,
          longitude: results[0].longitude,
        }
        this.setState({
          initialPosition: getInitialRegion, initialMarker: getInitialRegionMaker,
          title: results[0].name, address: results[0].address,
        })
        // this.setPinLocation(results);
        var getNearByLocationsPin = [];
        for (var i = 0; i <= 7; i++) {
          var obj = {
            coordinates: {
              latitude: results[i].latitude,
              longitude: results[i].longitude,
            },
            title: results[i].name,
            address: results[i].address
          }
          getNearByLocationsPin.push(obj);
        }
        this.setState({
          nearByPlacesPin: getNearByLocationsPin
        })
        results.shift();
        this.setState({ nearByPlaces: results })
      })
      .catch((error) => alert(error.message));
  }
  //It will be called when user search
  _filterSearch = (search) => {
    if (search.length == 0) return this.setState({ isSearching: false })
    else {
      RNGooglePlaces.getAutocompletePredictions(search, {})
        .then((place) => {
          console.log(place)
          this.setState({ newNearByPlaces: place, isSearching: true })
        })
        .catch(error => alert(error.message));
    }
  }

  //It will be called when user tab search result or tab search near by place
  _locationSelected = (item) => {
    alert(item.placeID)
    let url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${item.placeID}&key=AIzaSyBj7RibYyxrQ0LrgPvBU4YIfsMcbiBr0dk`;
    return fetch(url).then((response) => response.json()).then(data => {
      console.log(data)
      var latitude = data.result.geometry.location.lat;
      var longitude = data.result.geometry.location.lng;
      var getRegion = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: LATTITUDE_DELTA,
        longitudeDelta: LONGTITUDE_DELTA,
      }
      var getRegionMarker = {
        latitude: latitude,
        longitude: longitude,
      }
      this.setState({ searched: data.result.name, title: data.result.name, address: data.result.formatted_address, initialPosition: getRegion, initialMarker: getRegionMarker });
      let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=100&key=AIzaSyBj7RibYyxrQ0LrgPvBU4YIfsMcbiBr0dk`;
      return fetch(url).then((response) => response.json()).then(data => {
        console.log(data)
        this.setState({ isSearching: false, nearByPlaces: data.results, isSelected: true })
        var getNearByLocationsPin = [];
        var obj = {};
        for (var i = 0; i < 6; i++) {
          obj = {
            coordinates: {
              latitude: data.results[i].geometry.location.lat,
              longitude: data.results[i].geometry.location.lng,
            },
            title: data.results[i].name,
            address: data.results[i].vicinity
          }
          getNearByLocationsPin.push(obj);
        }
        this.setState({
          nearByPlacesPin: getNearByLocationsPin
        })
      }).catch(error => alert.log(error.message));
    }).catch(error => alert.log(error.message));
  }
  popupPlaceID(item){
    if(this.state.isSelected){
      alert(item.place_id);
    }
    else{
      alert(item.placeID)
    }
}
  render() {
    // console.log(this.props.navigation.state.params);
    console.log(this.state.nearByPlacesPin)
    return (
      <View style={styles.container} >
        {/* {this.state.isSearching ? <View></View> : */}
        <View style={styles.mapView}>
          <MapView
            // showsUserLocation={true}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={this.state.initialPosition}
            region={this.state.initialPosition}
            showsCompass={true}
            loadingEnabled={true}
            showsBuildings={true}
          >
            {this.state.nearByPlacesPin.map((marker, key) => (
              key == 0 ?
                <MapView.Marker
                  key={key}
                  title={marker.title}
                  image={require('@assets/images/marker.png')}
                  coordinate={this.state.initialMarker}
                />
                :
                <MapView.Marker
                  key={key} 
                  image={require('@assets/images/greenPin.png')}
                  title={marker.title}
                  coordinate={marker.coordinates}
                />

            ))}

          </MapView>
        </View>
        {/* } */}
        <View style={styles.selectLocation}>
          <Image source={require('@assets/images/greyPin.png')} style={styles.nearPlaceImage} />
          <Text style={styles.name}>Nearby Places</Text>
        </View>
        <FlatList
          data={this.state.nearByPlaces}
          renderItem={({ item }) =>
            <View>
                <View style={styles.item}>
                  <Image source={require('@assets/images/greenPin.png')} style={styles.placeImage} />
                  <View style={styles.infomation}>
                    <View>
                      <TouchableOpacity onPress={() => this.popupPlaceID(item)}>
                        <Text style={styles.name}>{item.name}</Text>
                        {this.state.isSelected ?
                          <Text style={styles.following}>{item.vicinity}</Text>
                          : <Text style={styles.following}>{item.address}</Text>
                        }
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
            </View>
          }
        />
        {this.state.isSearching ? <SearchResult nearByPlaces={this.state.newNearByPlaces} _locationSelected={this._locationSelected} /> : null}
      </View>
    );
  }
}



//make this component available to the app
export default MapDetailPage;
