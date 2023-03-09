import React, {useEffect, useState} from 'react';
import {FlatList, Image, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {EventsList} from '../../../components';
import styles from './style';
import * as actions from '../../../store/actions';
import {CommonStyle, showToastAlert} from '../../../theme';
import {useIsFocused} from '@react-navigation/native';
import {Images} from '../../../assets';
import Share from 'react-native-share';

const TimeLineScreen = props => {
  const initialState = {
    TimelineData: [],
  };
  const [timeLineData, setTimeLineData] = useState(initialState);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const {userDetails, loginData} = useSelector(state => state.authReducer);
  const [markFav, setMarkFav] = useState('');
  let userInfo;
  if (userDetails !== null && Array.isArray(userDetails)) {
    userInfo = userDetails[0];
  } else {
    userInfo = userDetails;
  }
  const updateState = (stateName, value) => {
    setTimeLineData(prevState => ({
      ...prevState,
      [stateName]: value,
    }));
  };
  useEffect(() => {
    getPostsById();
  }, [isFocused]);
  const getPostsById = () => {
    dispatch(
      actions.getTimelinePostsApiAction(loginData?.access_token, res => {
        if (res.status === 200) {
          updateState('TimelineData', res.data);
        } else {
          showToastAlert(res.data?.errors[0]?.message);
        }
      }),
    );
  };
  const renderItems = ({item, index}) => (
    <EventsList
      item={item}
      favStatus={item.isLikedByUser}
      onMarkFav={() => handleFav(item)}
      onShare={() => onShareAppTap()}
    />
  );
  async function onShareAppTap() {
    try {
      let sharedResponse = await Share.open({
        title: 'Malviyans Connect',
        message: `Hey! You might like this timeline`,
        // url: linkToShare,
      });
    } catch (error) {
      console.error('ERROR: .onShareAppTap : ', error);
    }
  }
  const handleFav = item => {
    if (!item.isLikedByUser) {
      dispatch(
        actions.markFavApiAction(
          {post: item.id},
          loginData?.access_token,
          res => {
            if (res.status === 200) {
              getPostsById();
            } else {
              showToastAlert(res.data?.errors[0]?.message);
            }
          },
        ),
      );
    } else {
      dispatch(
        actions.markUnFavApiAction(
          {postId: item.id, userId: item.user_created.id},
          loginData?.access_token,
          res => {
            if (res.status === 200) {
              getPostsById();
            } else {
              showToastAlert(res.data?.errors[0]?.message);
            }
          },
        ),
      );
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={timeLineData.TimelineData}
        renderItem={renderItems}
        contentContainerStyle={styles.contentContainerStyle}
        ListEmptyComponent={
          <View style={CommonStyle.emptyList}>
            <Image source={Images.EMPTY_LIST} style={CommonStyle.emptyImage} />
          </View>
        }
      />
    </View>
  );
};

export default TimeLineScreen;
