import React, {useEffect, useState} from 'react';
import {FlatList, Image, SafeAreaView, StatusBar, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Images} from '../../../assets';
import {EventsList, SearchBar} from '../../../components';
import {NavigationRoutes, Strings} from '../../../constants';
import {navigate} from '../../../services/navigationServices';
import * as actions from '../../../store/actions';
import {Colors, CommonStyle, showToastAlert} from '../../../theme';
import styles from './style';
import Share from 'react-native-share';

const EventScreen = props => {
  const {navigation, route} = props;
  const [eventsData, setEventsData] = useState([]);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const {loginData} = useSelector(state => state.authReducer);
  useEffect(() => {
    if (route.name === 'Make a Post') {
      navigate(NavigationRoutes.ADD_POST_SCREEN);
    }
    getPosts();
  }, []);

  const getPosts = () => {
    dispatch(
      actions.getTimelinePostsApiAction(loginData?.access_token, res => {
        if (res.status === 200) {
          setEventsData(res.data);
        } else {
          showToastAlert(res.data?.errors[0]?.message);
        }
      }),
    );
  };
  const onChangeText = text => {
    setSearch(text);
    console.log(text);
    if (text.trim().length === 0) {
      getPosts();
    } else {
      const filteredData = eventsData?.filter(
        x =>
          x?.user_created?.first_name
            ?.toLowerCase()
            .includes(text.toLowerCase()) ||
          x?.user_created?.last_name
            ?.toLowerCase()
            .includes(text.toLowerCase()) ||
          x?.caption?.toLowerCase().includes(text.toLowerCase()),
      );
      console.log(filteredData);
      setEventsData(filteredData);
    }
  };

  const renderItems = ({item, index}) => (
    <EventsList
      item={item}
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
              getPosts();
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
              getPosts();
            } else {
              showToastAlert(res.data?.errors[0]?.message);
            }
          },
        ),
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.COLOR_BLACK} hidden={false} />
      <View style={styles.searchBarView}>
        <SearchBar
          onPressClose={() => {}}
          label={Strings.EVENTS.SEARCH_TEXT}
          onPressClear={() => onChangeText('')}
          onChangeText={text => onChangeText(text)}
          value={search}
          color={Colors.COLOR_BLACK}
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={eventsData}
        renderItem={renderItems}
        contentContainerStyle={styles.contentContainerStyle}
        ListEmptyComponent={
          <View style={CommonStyle.emptyList}>
            <Image source={Images.EMPTY_LIST} />
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default EventScreen;
