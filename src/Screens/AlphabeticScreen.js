// @flow

'use strict';

import React, { Component } from 'react';
import { ActivityIndicator, Text, TextInput, View, SafeAreaView, StyleSheet, TouchableOpacity, TouchableHighlight, FlatList  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FormatDate } from '../Utils/helpers';
import gs from '../Utils/styles';

export default class Alphabetic extends Component {
  state = {
    data: [],
    searchInput: '',
    searchData: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
    this.arrayholder = [];
  }

  componentWillMount() {
    this.fetchData();
  }

  loadTradition(item) {
    this.props.navigation.navigate(
      'Tradition',
      {
        id: item.nid,
        title: item.title
      }
    );
  }

  fetchData = async () => {
    const response = await fetch('http://aretsdagar.nordiskamuseet.se/api/v1/views/traditions_alphabetic');
    const json = await response.json();
    this.setState({ data: json, searchData: json, isLoading: false });
    this.arrayholder = json;
  };

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function(item){
      const itemData = item.title.toUpperCase()
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    })
    this.setState({
      searchData: newData,
      searchInput: text
    })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={gs.loader}>
          <ActivityIndicator />
        </View>
      );
    }
    else {
      let data = [];
      if (this.state.searchInput) {
        data = this.state.searchData.filter(item => item.title.includes(this.state.searchInput));
      }
      else {
        data = this.state.data;
      }
      return (
        <SafeAreaView style={gs.container}>
          <TextInput
            style={styles.input}
            placeholder="Sök efter dag"
            onChangeText={(text) => this.SearchFilterFunction(text)}
            value={this.state.searchInput}
          />
          <View>
            <FlatList
              data={data}
              renderItem={({item, separators}) => (
                <TouchableHighlight
                  onPress={() => this.loadTradition(item)}
                  onShowUnderlay={separators.highlight}
                  onHideUnderlay={separators.unhighlight}>
                  <View style={gs.row}>
                    <View style={styles.rowStyle}>
                      <Text style={styles.rowTextStyle}>{item.title}</Text>
                      <View style={gs.celebRow}>
                        <Icon name="favorite" style={gs.celebIcon} size={16}/><Text style={gs.date}>{FormatDate(item.dates, item.multiple_dates)}</Text>
                      </View>
                    </View>
                    <View style={gs.nextWrapper}>
                      <Icon name="navigate-next" size={30} style={gs.next}/>
                    </View>
                  </View>
                </TouchableHighlight>
              )}
              keyExtractor={(item)=>item.nid}
              ItemSeparatorComponent={()=><View style={gs.listSeparator}/>}
            />
          </View>
        </SafeAreaView>
      );
    }
  }
}
const styles = StyleSheet.create({
  listWrapper: {
    alignItems: 'center',
    alignContent:'center',
    flexDirection: 'row',
    flexWrap:'wrap',
    justifyContent:'center'
  },
  input: {
    textAlign: 'left',
    height: 35,
    borderWidth: 1,
    borderColor: '#5f5f5f',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 10
  },
  rowStyle: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 15
  },
  rowTextStyle: {
    color: '#fff',
    fontSize: 16,
  }
})
