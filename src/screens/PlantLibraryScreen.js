import React, { useEffect, useState }  from 'react';
import { ActivityIndicator, Button, View, Text, FlatList, Image, Dimensions, ScrollView, RefreshControl, TextInput } from 'react-native';
import styles from './../styles/app.style';
import PlantGrid from './../components/PlantGrid';
import FooterNavigation from './../components/FooterNavigation';
import SearchTextBox from './../components/SearchTextBox';

import config from './../../config';

import { search_plants } from '../api/my_plants';


export default class PlantLibraryScreen extends React.Component {
// export default function PlantLibraryScreen({ route, navigation }) {
  constructor(props){
    super(props);
    this.state = { isLoading: true,
                   data: [],
                   filteredData: [] }
    // const [isLoading, setLoading] = useState(true);
  //   const [data, setData] = useState([]);
  //   const [filteredData, setFilteredData] = useState([]);

  //   const [refreshing, setRefreshing] = React.useState(false);

  //   const [query, setQuery] = useState('')
  //   const [fullData, setFullData] = useState([])
  }
  

  componentDidMount(){
    return fetch(config.PLANT_DB_URL_HOST+'/plants.json')
      .then((response) => response.json())
      .then((json) => {
        this.setState(
          {
            data: json.plants,
            filteredData: json.plants
          }
          )})
      .catch((error) => console.error(error))
      .finally(() => {this.state.isLoading=false});
  }

  update = filteredData => {
    this.setState({filteredData:filteredData})
  }

  reset = plants => {
    this.setState({filteredData:this.state.data})
  }

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   fetch(config.PLANT_DB_URL_HOST+'/plants.json')
  //     .then((response) => response.json())
  //     .then((json) => {setData(json.plants);
  //       setFilteredData(json.plants)})
  //     .catch((error) => console.error(error))
  //     .finally(() => {setLoading(false); setRefreshing(false)});
  // }, []);

  // const handleSearch = text => {
  //   setQuery(text)
  //   console.log(text)
  //   if(text.length >= 2){
  //     setLoading(true);
  //     search_plants(text)
  //     .then((response) => response)
  //     .then((json) => {
  //       console.log(json);
  //       setFilteredData(json)
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //     })
  //     .finally(() => {setLoading(false);})
  //   }
 
  // }

  render(){
    return (
      <View style={styles.library}>
        <SearchTextBox update = {this.update} reset = {this.reset} />


          <View style={{width: '100%', flex: 1}}>
          
            <PlantGrid data={this.state.filteredData} navigation={this.props.navigation} /> 
          </View>
    </View>
      

      )}
    
}
 
