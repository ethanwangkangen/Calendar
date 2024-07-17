import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  dayBox: {
    width: '33.33%', // 3 columns
    height: 100,
    aspectRatio: 1, // Makes it a square
    flexDirection: 'column', // Primary axis is vertical
    justifyContent: 'start', // Start from the top and work down.
    alignItems: 'center', // Horizontal alignment is centered
    borderWidth: 1,
    borderColor: "black",
  },

  monthBox: {
    width: '100%',
    height: 40,
    borderRadius: 10, // Rounded corners
    borderWidth: 2, // Border width
    borderColor: '#000', // Black border color
    alignItems: 'center', // Horizontally centered
    justifyContent: 'center', // Vertical distribution
  }
  ,

  monthScrollView: {
    flexGrow: 1,
    width: '100%',
  }, 

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom:20
  },
  
  modalOverlay: {
    animationType: "slide",
    flex: 1,
    flexDirection: 'column',
  },

  modalTop: {
    // Transparent top to click off the modal.
    width: "100%",
    height: "25%",
    transparent: "true"
  },

  touchableArea: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: "black", 
  },

  modalContent: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
  },

  modalText: {
    textAlign: 'left',
    paddingLeft: 7,
    multiline: true
    
  },

  loginPage: {
    width: "100%",
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },

  emailBox: {
    width: '100%',
    height: 40,
    borderRadius: 10, // Rounded corners
    borderWidth: 2, // Border width
    borderColor: '#000', // Black border color
    alignItems: 'center', // Horizontally centered
    justifyContent: 'center', // Vertical distribution
  },


  notesScrollView: {
    flex: 2,
    paddingTop: 2,
    backgroundColor: "white", 
    width: "100%", 
    borderColor: "black", 
    borderWidth: 2
  },

  
  eventsScrollView: {
    flex: 1,
    paddingTop: 2,
    backgroundColor: "white", 
    width: "100%", 
    borderColor: "black", 
    borderWidth: 2,
  
  },

  eventCreationBox: {
    width: "90%",
    flexDirection: 'row',
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
    paddingTop: 6,
    
  },


  

  

});

export default styles;

