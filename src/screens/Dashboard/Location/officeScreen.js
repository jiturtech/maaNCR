import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import MapScreen from './mapScreen';
import styles from './style';

const OfficeScreen = props => {
  const [officeData, setOfficeData] = useState([]);
  useEffect(() => {
    let arr = [];
    props.data?.data?.map(item => {
      console.log(item);
      if (item.live_lat !== null) {
        let newReq = {
          first_name: item.first_name,
          last_name: item.last_name,
          graduation_year: item.graduation_year,
          company_name: item.company_name,
          designation: item.designation,
          photo_url: item.photo_url,
          latitude: item.residence_lat,
          longitude: item.residence_long,
        };
        arr.push(newReq);
      }
    });
    setOfficeData(arr);
  }, []);
  return (
    <View style={styles.container}>
      <MapScreen data={officeData} props={props} />
    </View>
  );
};

export default OfficeScreen;
