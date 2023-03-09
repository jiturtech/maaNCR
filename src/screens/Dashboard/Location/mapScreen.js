import * as geolib from 'geolib';
import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, Image, SafeAreaView, StyleSheet, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Callout, Marker} from 'react-native-maps';
import {Image as ImageSvg, Svg} from 'react-native-svg';
import {Images} from '../../../assets';
import {Text} from '../../../components';
import {Const} from '../../../constants';
import styles from './mapStyles';

const MapScreen = ({data, props}) => {
  const {width, height} = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 20;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const [nearestStore, setNearestStore] = useState([]);
  const [mapReady, setMapReady] = useState(false);
  const refMap = useRef();
  const [initialRegion, setInitialRegion] = useState({
    latitude: 27.510429,
    longitude: 78.314728,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [showMarkerImg, setShowMarkerImg] = useState(false);
  useEffect(() => {
    getCurrentLocation();
  }, [data]);
  const getCurrentLocation = async () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setInitialRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        });
        getNearestLocation(latitude, longitude);
      },
      error => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const getNearestLocation = (lat, lng) => {
    const response = data?.filter(marker => {
      let distance = geolib.getDistance(
        {latitude: lat, longitude: lng},
        {latitude: marker.latitude, longitude: marker.longitude},
      );
      const unit = geolib.convertDistance(distance, 'km');

      return distance; //distance <= 100000;
    });

    setNearestStore(response);
  };

  useEffect(() => {
    if (mapReady && refMap?.current?.animateCamera) {
      refMap.current.animateCamera(
        {
          center: {
            latitude: initialRegion.latitude,
            longitude: initialRegion.longitude,
          },
          zoom: 20,
        },
        {duration: 1000},
      );
    }
  }, [mapReady, refMap]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <MapView
        initialRegion={initialRegion}
        style={{
          ...StyleSheet.absoluteFillObject,
        }}
        showsMyLocationButton={false}
        showsUserLocation={true}
        mapType="standard"
        onMapReady={() => {
          setMapReady(true);
        }}
        ref={refMap}>
        {nearestStore.map((item, index) => {
          return (
            <Marker
              key={index}
              coordinate={{latitude: item.latitude, longitude: item.longitude}}>
              <View style={styles.markerContainer}>
                <Image source={Images.MARKER} style={styles.markerImg} />
              </View>
              <Callout tooltip={false}>
                <Svg bbWidth={100} height={100}>
                  <ImageSvg
                    width={'100%'}
                    height={'100%'}
                    preserveAspectRatio="xMidYMid slice"
                    href={{uri: item?.photo_url}}
                    x="0%"
                  />
                </Svg>

                <Text
                  variant={Const.h3}
                  style={styles.businessName}
                  numberOfLines={1}>
                  {`${item?.first_name} ${item?.last_name}`}
                </Text>
                <Text
                  variant={Const.body3}
                  style={styles.description}
                  numberOfLines={1}>
                  {`${item?.designation}, ${item?.company_name}`}
                </Text>
                <Text
                  variant={Const.body1}
                  style={styles.address}
                  numberOfLines={1}>
                  {`Batch of ${item?.graduation_year}`}
                </Text>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </SafeAreaView>
  );
};

export default MapScreen;
