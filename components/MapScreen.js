// // import React from 'react'
// //     import MapView from 'react-native-maps'
// //     import { StyleSheet, Dimensions } from 'react-native'

// //     const height = Dimensions.get('window').height

// //     const Map = () => {
// //       return (
// //         <MapView
// //           style={styles.map}
// //           loadingEnabled={true}
// //           region={{
// //             latitude: 37.78825,
// //             longitude: -122.4324,
// //             latitudeDelta: 0.015,
// //             longitudeDelta: 0.0121
// //           }}
// //         >

// //         </MapView>
// //       )
// //     }

// //     const styles = StyleSheet.create({
// //       map: {
// //         height
// //       }
// //     })

// //     export default Map



// import MapView from 'react-native-maps'


// export default class App extends Component<Props> { 
//      render() {    return (    
//            <MapView    
//             style={{flex: 1}}        region={{      
//                     latitude: 42.882004,       
//                        longitude: 74.582748,      
//                            latitudeDelta: 0.0922,    
//                              longitudeDelta: 0.0421        }}    
//                                  showsUserLocation={true}      />    ); 
//                                  }}




     import React from 'react'
    import { SafeAreaView } from 'react-navigation'
    
    import Map from './Map'

    const MapScreen = ({ navigation }) => {
        return (
        <SafeAreaView forceInset={{ top: 'always' }}>
          <Map/>
        </SafeAreaView>
    )
    }

    export default MapScreen;
