import React, { useEffect, useState, useRef, useCallback }  from 'react';
import { Dimensions, FlatList, Image, View, Text, StyleSheet } from 'react-native';

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const slideList = Array.from({ length: 30 }).map((_, i) => {
  return {
    id: i,
    image: `https://picsum.photos/1440/2842?random=${i}`,
    title: `This is the title! ${i + 1}`,
    subtitle: `This is the subtitle ${i + 1}!`,
  };
});

function Slide({ data }) {
  return (
    <View
      style={{
        height: windowHeight * 0.3,
        width: windowWidth,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={{ uri: data[1] }}
        style={{ width: windowWidth, height: windowHeight * 0.3 }}
      ></Image>
    </View>
  );
}

function Pagination({ index, pictures }) {
  return (
    <View style={styles.pagination} pointerEvents="none">
      {pictures.map((_, i) => {
        return (
          <View
            key={i}
            style={[
              styles.paginationDot,
              index === i
                ? styles.paginationDotActive
                : styles.paginationDotInactive,
            ]}
          />
        );
      })}
    </View>
  );
}

export default function Carousel(data) {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  indexRef.current = index;



  const onScroll = useCallback((event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    const distance = Math.abs(roundIndex - index);

    // Prevent one pixel triggering setIndex in the middle
    // of the transition. With this we have to scroll a bit
    // more to trigger the index change.
    const isNoMansLand = 0.5 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);


  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback(e => e.id, []),
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: windowWidth,
        offset: index * windowWidth,
      }),
      []
    ),
  };

  return (
  	<View>
    <FlatList
      data={data.pictures}
      renderItem={({ item }) => {
        return <Slide data={item} />;
      }}
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      onScroll={onScroll}
      {...flatListOptimizationProps}
    />
    <Pagination index={index} pictures={data.pictures} ></Pagination>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    height: windowHeight,
    width: windowWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  slideImage: { width: windowWidth * 0.9, height: windowHeight * 0.7 },
  slideTitle: { fontSize: 24 },
  slideSubtitle: { fontSize: 18 },

  pagination: {
    position: "absolute",
    bottom: 8,
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  paginationDotActive: { backgroundColor: "#18cd58" },
  paginationDotInactive: { backgroundColor: "gray" },

  carousel: { flex: 1 },
});

//https://dev.to/lloyds-digital/let-s-create-a-carousel-in-react-native-4ae2