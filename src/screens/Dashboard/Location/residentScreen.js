import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import MapScreen from './mapScreen';
import styles from './style';

const ResidentScreen = props => {
  const [residentData, setResidentData] = useState([]);
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
    setResidentData(arr);
  }, []);
  return (
    <View style={styles.container}>
      <MapScreen data={residentData} props={props} />
    </View>
  );
};

export default ResidentScreen;
