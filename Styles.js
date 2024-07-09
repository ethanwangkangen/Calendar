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
    borderColor: '#ccc',
    borderColor: "orange",
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
    borderWidth: 10, 
    borderColor: 'red', 
    width: '100%',
  }, 

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom:20
  },
  
  modalOverlay: {
    animationType: "slide",
    color: "blue",
    borderWidth:10,
    borderColor: "black"
  },

  modalTop: {
    // Transparent top to click off the modal.
    width: "100%",
    height: "18%",
    borderWidth: 1, 
    transparent: "true"
  },

  touchableArea: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: "green",
    borderWidth: 10
  },

  modalContent: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalText: {
    textAlign: 'center',
  },

});

export default styles;