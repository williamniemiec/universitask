import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

const list = [{id: '1', name: 'a'}, {id: '2', name: 'b'}]
const {vw, vh, vmin, vmax} = require('react-native-expo-viewport-units');

const ListItem = ({data}) => (
  <View style={styles.rowFront}>
    <Text>{data.item.name}</Text>
  </View>
);

const SwipeListItem = ({data}) => (
  <View style={styles.rowBack}>
    <Image source={require('../../assets/img/icon/trash.png')} style={styles.rowBackIcon}/>
  </View>
);

const Task = () => {
  return (
    <SwipeListView
      data={list}
      keyExtractor={(item) => item.id}
      style={{flex: 1, width: '100%'}}
      leftOpenValue={60}
      renderItem={(item, index) => <ListItem data={item} onPress={() => alert('DONE!')} />}
      renderHiddenItem={({item, index}) => <SwipeListItem />}
      disableLeftSwipe={true}
      stopLeftSwipe={60}
      onRowOpen={(rowKey, rowMap) => {
        const target = rowMap[rowKey].props.item
        const idx = list.indexOf(target);

        rowMap[rowKey].closeRow();
        //removeItem(idx);
      }}
    />
  );/*
  listViewData = Array(20)
    .fill("")
    .map((_, i) => ({ key: `${i}`, text: `item #${i}` }));
  return (
    <SwipeListView
        data={listViewData}
        renderItem={ (data, rowMap) => (
            <View style={styles.rowFront}>
                <Text>I am {data.item.text} in a SwipeListView</Text>
            </View>
        )}
        renderHiddenItem={ (data, rowMap) => (
            <View style={styles.rowBack}>
                <Text>Left</Text>
                <Text>Right</Text>
            </View>
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
    />
)*/
}

const styles = StyleSheet.create({
  rowFront: {
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderColor: '#707070',
      borderWidth: 1,
      justifyContent: 'center',
      height: 60,
      width: vw(90),
      marginBottom: 30
  },
  rowBackIcon: {
    maxHeight: 30,
    maxWidth: 30,
  },
  rowBack: {
    maxHeight: 60,
    backgroundColor: '#cc0000',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  }
});

export default Task;
