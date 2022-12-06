import React, { memo } from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import isEqual from 'react-fast-compare';
import { images } from '@assets/image';
import { WIDTH_SCREEN } from '@theme';

const HomeComponent = () => {
  // render
  return (
    <View>
      {/* header */}
      <ImageBackground
        style={styles.header_image_bg}
        source={images.header_home_bg}>
        <Text>helo</Text>
      </ImageBackground>
      <View style={styles.wrapper_tour_special}>
        <Text style={styles.text_tour_special}>Tour nổi bật</Text>
        <Text style={styles.text_more}>Xem thêm</Text>
      </View>
      <FlatList
        style={{ paddingHorizontal: 20 }}
        data={['1', '2']}
        keyExtractor={record => record}
        renderItem={() => (
          <ImageBackground style={styles.tour_image} source={images.tour_image}>
            <View style={styles.wrapper_time_tour}>
              <Text style={styles.title_tour}>
                Tour du lịch ABC XYZ gì đó sẽ hiển thị 2 dòng ở đây
              </Text>
              <View style={styles.time_tour}>
                <Text style={styles.text_time}>4 ngày 3 đêm</Text>
                <Text style={styles.text_calendar}>26/12/2022</Text>
              </View>
            </View>
          </ImageBackground>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header_image_bg: {
    width: WIDTH_SCREEN,
    height: 220,
  },
  wrapper_tour_special: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  text_tour_special: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0C656A',
  },
  text_more: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  tour_image: {
    width: 240,
    height: 320,
    marginRight: 12,
    borderRadius: 16,
    resizeMode: 'cover',
    overflow: 'hidden',
    flex: 1,
    justifyContent: 'flex-end',
  },
  title_tour: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  wrapper_time_tour: {
    backgroundColor: 'rgba(0,0,0,.12)',
    paddingTop: 50,
  },
  time_tour: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  text_time: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f3f3f3',
  },
  text_calendar: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f3f3f3',
  },
});

export const Home = memo(HomeComponent, isEqual);
