import React, { Component } from 'react'
import { FlatList, Image, KeyboardAvoidingView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import data from './data.json'
const advisorsData = data.data.advisorProfileCollection;
export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      _txtSearch: '',
      advisors: advisorsData.items,
      isEnable: false
    }
  }

  _onChange = (text) =>{
    this.setState({
      _txtSearch: text
    })
    if(text === '')
    {
      this.setState({
        advisors: advisorsData.items
      })
    }
  }

  _onSearch = () =>{
    const {_txtSearch} = this.state;
    const nameFilter = advisorsData.items.filter((item) => {
      return item.displayName.toLowerCase().indexOf(_txtSearch.toLowerCase()) !== -1;
    })
    const categoryFilter = advisorsData.items.filter((item) => {
      return item.displayName.toLowerCase().indexOf(_txtSearch.toLowerCase()) !== -1;
    })
    if(_txtSearch)
    {
      this.setState({
        advisors: advisorsData.items.filter((item) => {
          return item.displayName.toLowerCase().indexOf(_txtSearch.toLowerCase()) !== -1 && item.status === this.state.isEnable;
        })
      })
    } else {
      this.setState({
        advisors: advisorsData.items
      })
    }

  }

  toggleSwitch =() =>{
    this.setState({
      isEnable: !this.state.isEnable
    })
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
      <View style={styles.contentSearch}>
      <Switch
      trackColor={{ false: "#767577", true: "#81b0ff" }}
      thumbColor={this.state.isEnable ? "green" : "#f4f3f4"}
      ios_backgroundColor="#3e3e3e"
      onValueChange={this.toggleSwitch}
      value={this.state.isEnable}
    />
      <TextInput onChangeText={text => this._onChange(text)} style={styles.inputSearch} placeholder="Nhập tên"/>
      <TouchableOpacity style={styles.buttonSearch} onPress={this._onSearch}>
        <Text style={styles.textSearch}> Search </Text>
      </TouchableOpacity>
    </View>
        <FlatList
          style={styles.listHorizontal}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={this.state.advisors}
          renderItem={({item}) => {
            return (
              item.status === this.state.isEnable ?
              <View style={styles.contentHorizontal}>
                {item.avatarUrl !== null ? <Image style={styles.ImageHorizontal} source={{uri: item.avatarUrl.url}}/> : <Image style={styles.ImageHorizontal} source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCF5EIU3k8iIpMuWjH3wIdEEaqlHfvYVcXPg&usqp=CAU"}}/>}
                <Text style={styles.textHorizontal}>{item.displayName}</Text>
              </View> : null
            )
          }}
          keyExtractor={item => item.sys.id}
        />
        <FlatList
        style={styles.listVertical}
        showsVerticalScrollIndicator={false}
        data={this.state.advisors}
        renderItem={({item}) => {
          return (
            item.status === this.state.isEnable ?
            <View style={styles.contentVertical}>
              {item.avatarUrl !== null ? <Image style={styles.ImageVertical} source={{uri: item.avatarUrl.url}}/> : <Image style={styles.ImageVertical} source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCF5EIU3k8iIpMuWjH3wIdEEaqlHfvYVcXPg&usqp=CAU"}}/>}
              <View style={styles.contentDetail}>
                  <Text style={styles.detailName}>{item.displayName}</Text>
                  {item.email ?
                    <View style={styles.subDetail}>
                    <Text style={styles.email}>{item.email}</Text>
                    <Text style={styles.phone}>{item.phone}</Text>
                  </View> : null}
              </View>
            </View> : null
          )
        }}
        keyExtractor={item => item.sys.id}
      />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    padding: 10,
  },
  banner:{
    color: 'green',
    width: '100%',
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: 'bold'
  },
  ImageHorizontal:{
    height: 50,
    width: 50,
    borderRadius: 50
  },
  contentHorizontal:{
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 100,
    paddingVertical:10,
  },
  textHorizontal:{
    textAlign:'center'
  },
  listHorizontal:{
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: 10,
    width: '100%',
  },
  listVertical:{
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: 10,
    marginTop: 30,
    width: '100%',
  },
  contentVertical:{
    marginHorizontal: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical:10,
    flexDirection: 'row',
    width: '100%'
  },
  ImageVertical:{
    height: 50,
    width: 50,
    borderRadius: 50
  },
  contentDetail:{
    flex: 1,
    paddingHorizontal: 5,
    justifyContent: 'center',
  },
  detailName:{

  },
  subDetail:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  email:{
    fontSize: 12,
    opacity: 0.7
  },
  phone:{
    fontSize: 12,
    opacity: 0.7,
    paddingLeft: 10
  },
  contentSearch:{
    flexDirection: 'row',
    marginBottom: 30,
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  inputSearch:{
    flex: 1,
    borderWidth: 0.5,
    marginVertical: 10,
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  buttonSearch:{
    borderWidth: 0.5,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
