import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {GridList} from '../../../components';
import {CommonStyle, showToastAlert} from '../../../theme';
import styles from './style';
import * as actions from '../../../store/actions';
import {Images} from '../../../assets';

const GalleryScreen = props => {
  const initialState = {
    data: [],
  };
  const [galleryData, setGalleryData] = useState(initialState);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const {userDetails} = useSelector(state => state.authReducer);
  let userInfo;
  if (userDetails !== null && Array.isArray(userDetails)) {
    userInfo = userDetails[0];
  } else {
    userInfo = userDetails;
  }
  const updateState = (stateName, value) => {
    setGalleryData(prevState => ({
      ...prevState,
      [stateName]: value,
    }));
  };
  useEffect(() => {
    getPostsById();
  }, [isFocused]);
  const getPostsById = () => {
    let request = {
      userId: userInfo.id,
      type: 'gallery',
    };
    dispatch(
      actions.getPostsByIdApiAction(request, res => {
        if (res.status === 200) {
          updateState('data', res.data.data);
        } else {
          showToastAlert(res.data?.errors[0]?.message);
        }
      }),
    );
  };
  console.log(galleryData.data);
  const renderItems = ({item, index}) => <GridList data={item} />;
  return (
    <View style={styles.container}>
      <View style={styles.primaryView}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={galleryData.data}
          renderItem={renderItems}
          contentContainerStyle={styles.contentContainerStyle}
          numColumns={3}
          ListEmptyComponent={
            <View style={CommonStyle.emptyList}>
              <Image
                source={Images.EMPTY_LIST}
                style={CommonStyle.emptyImage}
              />
            </View>
          }
        />
      </View>
    </View>
  );
};

export default GalleryScreen;
