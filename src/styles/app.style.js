import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#129840',
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
    width: 250,
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
      backgroundColor:"#16bb4f",
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
    backgroundColor:"#17c653",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  }
  
});