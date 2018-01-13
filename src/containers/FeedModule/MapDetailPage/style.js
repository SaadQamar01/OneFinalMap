import { StyleSheet } from 'react-native'
import { BACKGROUNDCOLOR, DARK_GRAY_COLOR, LIGHT_GRAY_COLOR } from '../../../theme/colors';
import { BIG_FONT_SIZE, NORMAL_FONT_SIZE,SMALL_FONT_SIZE } from '../../../theme/fonts';

import { getDeviceWidth, getDeviceHeight} from '@global'
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
  },
  titleText: {
    fontSize: BIG_FONT_SIZE,
    color: DARK_GRAY_COLOR
  },
  addressText: {
    fontSize: NORMAL_FONT_SIZE,
    color: LIGHT_GRAY_COLOR
  },
  SectionStyle: {
    // position:'absolute',
    height:50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    // top:15,
    // zIndex:99,
    // marginHorizontal: 20
},
ImageStyle: {
  padding: 10,
  marginLeft: 10,
  height: 25,
  width: 25,
  resizeMode : 'stretch',
  alignItems: 'center'
},
backArrow: {
  padding: 10,
  marginLeft: 10,
  marginRight: 10,
  height: 25,
  width: 25,
  resizeMode : 'stretch',
  alignItems: 'center'
},
  textInput: {
    flex:1,
},
  mapView: {
    width: '100%',
    height: '40%'
  },
  map: {
    width: '100%',
    height: '100%'
  },
  mapmarker: {
    width: getDeviceWidth(79),
    height: getDeviceHeight(95),
  },
  placeImage: {
    marginRight:'3%',
    marginBottom:'5%',
    width: getDeviceWidth(140),
    height: getDeviceHeight(140),
    resizeMode: 'contain'
  },
  nearPlaceImage: {
    marginRight:'3%',
    width: getDeviceWidth(140),
    height: getDeviceHeight(140),
    resizeMode: 'contain'
  },
  selectLocation:{
    padding:'4%',
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  item: {
    // height: getDeviceHeight(192),
    marginLeft: getDeviceWidth(60),
    alignItems: 'center',
    flexDirection: 'row'
  },
  infomation: {
    marginLeft: getDeviceWidth(60),
    paddingBottom:'1%',
    marginBottom:'5%',
    width: getDeviceWidth(980),
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_GRAY_COLOR,
    // marginLeft:' 5%',
    // marginRight:' 5%',
    // backgroundColor: 'white',
    // borderBottomWidth: 1,
    // borderBottomColor: LIGHT_GRAY_COLOR
  },
  name: {
    fontSize: NORMAL_FONT_SIZE,
    color: DARK_GRAY_COLOR
  },
  following: {
    fontSize: SMALL_FONT_SIZE,
    color: LIGHT_GRAY_COLOR
  },
});

export default styles;