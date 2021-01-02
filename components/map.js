import React, { Component } from "react";
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
import {  Descriptions } from 'antd';
import GoogleMapReact from 'google-map-react';
import { Button, Text,  View,} from 'react-native';
import axios from "axios";
import  AsyncStorage  from '@react-native-community/async-storage';
// import Button from 'react-bootstrap/Button';
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");
Geocode.setApiKey("AIzaSyDhdSw1QzkXBrYnLSt3EF3izfHEhUj6LMc");
Geocode.enableDebug();
class LocationSearchModal extends Component {
    constructor(props) {
        super(props);

this.state = {
        address: '',
        city: '',
        area: '',
        state: '',
        link:'',
        zoom: 15,
        height: 400,
        mapPosition: {
            lat: 0,
            lng: 0,
        },
        markerPosition: {
            lat: 0,
            lng: 0,
        }
    } }
 
    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    mapPosition: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    },
                    markerPosition: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }
                },
                    () => {
                        Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
                            response => {
                                // console.log(`https://www.latlong.net/c/?lat=${position.coords.latitude}&long=${position.coords.longitude}`)
                                this.setState({link:`https://www.latlong.net/c/?lat=${position.coords.latitude}&long=${position.coords.longitude}`})
                                const address = response.results[0].formatted_address,
                                    addressArray = response.results[0].address_components,
                                    city = this.getCity(addressArray),
                                    area = this.getArea(addressArray),
                                    state = this.getState(addressArray);
                                console.log('city', city, area, state);
                                this.setState({
                                    address: (address) ? address : '',
                                    area: (area) ? area : '',
                                    city: (city) ? city : '',
                                    state: (state) ? state : '',
                                })
                            },
                            error => {
                                console.error(error);
                            }
                        );
                    })
            });
        } else {
            console.error("Geolocation is not supported by this browser!");
        }
    };
  
    getCity = (addressArray) => {
        let city = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
                city = addressArray[i].long_name;
                return city;
            }
        }
    };
    getArea = (addressArray) => {
        let area = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0]) {
                for (let j = 0; j < addressArray[i].types.length; j++) {
                    if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
                        area = addressArray[i].long_name;
                        return area;
                    }
                }
            }
        }
    };
    getState = (addressArray) => {
        let state = '';
        for (let i = 0; i < addressArray.length; i++) {
            for (let i = 0; i < addressArray.length; i++) {
                if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
                    state = addressArray[i].long_name;
                    return state;
                }
            }
        }
    };
    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        // console.log(event.target.value)
       
    };
  
    onInfoWindowClose = (event) => { };
    onMarkerDragEnd = (event) => {
        let newLat = event.latLng.lat(),
            newLng = event.latLng.lng();
        Geocode.fromLatLng(newLat, newLng).then(
            response => {
                const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components,
                    city = this.getCity(addressArray),
                    area = this.getArea(addressArray),
                    state = this.getState(addressArray);
                this.setState({
                    address: (address) ? address : '',
                    area: (area) ? area : '',
                    city: (city) ? city : '',
                    state: (state) ? state : '',
                    markerPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                    mapPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                })
            },
            error => {
                console.error(error);
            }
        );
    };
    onPlaceSelected = (place) => {
        console.log('plc', place);
        const address = place.formatted_address,
            addressArray = place.address_components,
            city = this.getCity(addressArray),
            area = this.getArea(addressArray),
            state = this.getState(addressArray),
            latValue = place.geometry.location.lat(),
            lngValue = place.geometry.location.lng();
            console.log('latValue'+latValue)
        console.log('latvalue', latValue)
        console.log('lngValue', lngValue)
        // Set these values in the state.
        this.setState({
            address: (address) ? address : '',
            area: (area) ? area : '',
            city: (city) ? city : '',
            state: (state) ? state : '',
            markerPosition: {
                lat: latValue,
                lng: lngValue
            },
            mapPosition: {
                lat: latValue,
                lng: lngValue
            },
        })
    };
    async handleSubmit () { 
        console.log('sfsd')
      var location = this.state.link;
      console.log(location)
     
      try {
        //to save token of logged in user in the storage
     await AsyncStorage.setItem('location',location) 
    
     console.log('saved', location)
     }
    catch (e){
    console.log(e)
    }
        //to get token of logged in user in the storage
    const trial = await AsyncStorage.getItem('location')
    console.log(trial)
   await this.props.navigation.navigate("Add new item")
       
    }
    render() {
        const AsyncMap = withScriptjs(
            withGoogleMap(
                props => (
                    <GoogleMap
                        defaultZoom={this.state.zoom}
                        defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
                    >
                        {/* InfoWindow on top of marker */}
                        {/*Marker*/}
                        <Marker
                            google={this.props.google}
                            name={'Dolores park'}
                            draggable={true}
                            onDragEnd={this.onMarkerDragEnd}
                            position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
                        />
                        <InfoWindow
                            onClose={this.onInfoWindowClose}
                            position={{ lat: (this.state.markerPosition.lat + 0.0018), lng: this.state.markerPosition.lng }}
                        >
                            <View>
                               <Text style={{ padding: 0, margin: 0 }}>{this.state.address}</Text>
                                </View>
                        </InfoWindow>
                        <Marker />
                        {/* <MarkerWithLabel
                            position={{ lat: -34.397, lng: 150.644 }}
                            labelAnchor={new google.maps.Point(0, 0)}
                            labelStyle={{ backgroundColor: "yellow", fontSize: "32px", padding: "16px" }}
                        >
                            <div>Hello There!</div>
                        </MarkerWithLabel> */}
                        {/* For Auto complete Search Box */}
                        <Autocomplete
                            style={{
                                width: '100%',
                                height: '40px',
                                paddingLeft: '16px',
                                marginTop: '2px',
                                marginBottom: '2rem'
                            }}
                            onPlaceSelected={this.onPlaceSelected}
                            types={['(regions)']}
                        />
                    </GoogleMap>
                )
            )
        );
        return (
            <View style={{ padding: '1rem', margin: '0 auto', maxWidth: 1000 }}>
                <h2>Google Map</h2>
                <h3>Find your location ..</h3>
                <Descriptions bordered>
                    <Descriptions.Item label="City">{this.state.city}</Descriptions.Item>
                    <Descriptions.Item label="Area">{this.state.area}</Descriptions.Item>
                    <Descriptions.Item label="State">{this.state.state}</Descriptions.Item>
                    <Descriptions.Item label="Address">{this.state.address}</Descriptions.Item>
                </Descriptions>
                <Button  type="submit"  onPress={this.handleSubmit.bind(this)}   title="Save location" />
                <AsyncMap
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDhdSw1QzkXBrYnLSt3EF3izfHEhUj6LMc&libraries=places"
                    loadingElement={
                        <View style={{ height: `100%` ,width: `100%`}} />
                    }
                    containerElement={
                        <View style={{ height: this.state.height }} />
                    }
                    mapElement={
                        <View style={{ height: `100%`,width: `100%` }} />
                    }
                />
                 <br/>
                 <br/>
            
            </View>
        )
    }
}
export default LocationSearchModal;