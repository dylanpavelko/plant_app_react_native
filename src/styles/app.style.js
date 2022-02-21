import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#c4e5cf',
      alignItems: 'center',
      justifyContent: 'center'
    },
    library: {
      backgroundColor: '#c4e5cf',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1
    },
    background: {
      flex: 1,
      backgroundColor: '#c4e5cf',
    },
    title: {
      color: 'white',
      fontSize: 30
    },
    plantLink: {
      color: 'white',
    },
    plant_image_detail: {
    width: '100%',
    height: 250,
    },
    bold: {
      fontWeight: 'bold'
    },
    italic: {
      fontStyle: 'italic'
    },
    absoluteView: {
      flex: 1,
      position: 'absolute',
      backgroundColor: 'rgba(0,0,0,0.5)',
      bottom: 0
    },
    inputView:{
      width:"80%",
      backgroundColor:"#18cd58",
      borderRadius:25,
      height:60,
      marginBottom:20,
      justifyContent:"center",
      padding:20
  },
  inputText:{
    color:"white"
  }, 
  loginBtn:{
    width:"80%",
    backgroundColor:"#18cd58",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10,
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start' // if you want to fill rows left to right
  },
  item50R: {
    width: '50%', // is 50% of container width
    paddingLeft: 5,
  },
  item50L: {
    width: '50%', // is 50% of container width
  },
  listHeader: {
    fontSize: 18,
    fontWeight: 'bold'
  }

  
});