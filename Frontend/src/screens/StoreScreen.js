import { LinearGradient } from 'expo-linear-gradient';
import { Linking, StyleSheet, Text, View , TouchableOpacity , Image} from 'react-native';
import { useFonts } from "expo-font";

export default function StoreScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
      'JosefinSans': require('../../assets/fonts/JosefinSans.ttf'),
  });

  return (
    <View style={ styles.background }>
      {/* Add the header */}
      <View style={ styles.header }>
        <Text style={styles.title}>STORE</Text>
        
      </View>

      {/* Add the profile */}     
      <View style={styles.curve}>
        {/* Ads Removal Section */}
        <Text style={ styles.text }> ADS REMOVAL </Text>
        <View style={styles.container}>
          <View style={styles.element0}>
            <View style={styles.child}>
              <Text style={styles.title2}>30 DAYS</Text>
              <View style={styles.priceContainer2}>
                <Text>$0.99</Text>
              </View>
            </View>
            <View style={styles.child}>
              <Text style={styles.title2}>365 DAYS</Text>
              <View style={styles.priceContainer2}>
                <Text>$9.99</Text>
              </View>
            </View>
          </View>
          <View style={styles.element1}>
            <Text style={styles.title1}>Indefinite</Text>
            <View style={styles.priceContainer}>
              <Text>$29.9</Text>
            </View>
          </View>
        </View>
        {/* Tarot Card Design Section */}
        <Text style={ styles.text }> TAROT DESIGN ( BACK CARD ) </Text>
        <View style={styles.designContainer}>
          <View style={styles.card}></View>
          <View style={styles.card}></View>
          <View style={styles.card}></View>
        </View>


      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    overflow: 'hidden',
    fontFamily: 'JosefinSans',
    backgroundColor: "#242049",
  },
  header: {
    alignItems: 'center',
    fontFamily: 'JosefinSans',
  },
  title: {
    marginTop: '15%',
    marginBottom: '15%',
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'JosefinSans',
  },
  text: {
    fontSize: '1.3rem',
    color: 'black',
    fontWeight: 500,
    top: '4%',
    fontFamily: 'JosefinSans',
    color:'#FF7575'
  },
  curve: {
    alignSelf: 'center',
    width: 678 ,
    height: 1225,
    backgroundColor: '#FEFDFD',
    borderTopLeftRadius: 500,
    borderTopRightRadius: 500,
    // inside
    alignItems: 'center',
  },
  container:{
    borderRadius:20,
    height:'20%',
    width:'50%',
    marginTop:'8%'
  },
  element0:{
    display:'flex',
    flexDirection:'row',
    alignSelf:'center',
    justifyContent:'space-between',
    width:'100%',
    height:'50%',
    padding:10,
    marginTop:5,
    borderRadius:8,
  },
  element1: {
    alignSelf: "center",
    justifyContent: "space-between",
    width: "95%",
    height: "50%",
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: "white", // Optional: Avoids transparency issues
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  
  title1: {
    alignSelf: "flex-start",
  },
  
  priceContainer: {
    alignSelf: "flex-end",
    paddingLeft:15,
    paddingRight:15,
    paddingTop:5,
    paddingBottom:5,
    borderRadius:15,
    backgroundColor:'#FF7575'
    
  },
  child:{
    borderRadius:8,
    width:'47.5%',
    height:'100%',
    margin:0,
    borderWidth:1,
    borderColor:'grey',
    justifyContent:'space-between',
    backgroundColor: "white",
    padding: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title2:{
    alignSelf:'flex-start'
  },
  priceContainer2:{
    alignSelf:'flex-end',
    paddingLeft:5,
    paddingRight:5,
    paddingTop:2,
    paddingBottom:2,
    borderRadius:10,
    backgroundColor:'#FF7575'
  },
  designContainer:{
    display:'flex',
    flexDirection:'row',
    alignSelf:'center',
    justifyContent:'space-between',
    width:'50%',
    height:'50%',
    padding:10,
    marginTop:45,
    borderRadius:8,

  },
  card:{
    borderRadius:8,
    width:'30.5%',
    height:'20.5%',
    margin:0,
    borderWidth:1,
    borderColor:'grey',
    justifyContent:'space-between',
    backgroundColor: "white",
    padding: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  }
});
