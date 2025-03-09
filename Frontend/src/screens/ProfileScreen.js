import { LinearGradient } from 'expo-linear-gradient';
import { Linking, StyleSheet, Text, View , TouchableOpacity , Image} from 'react-native';
import { useFonts } from "expo-font";

export default function ProfileScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
      'JosefinSans': require('../../assets/fonts/JosefinSans.ttf'),
  });

  return (
    <LinearGradient
      colors={['#EFB6C8', '#8B87CC', '#EFB6C8']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}
    >
      {/* Add the header */}
      <View style={ styles.header }>
        <TouchableOpacity style={{paddingLeft: 20}} onPress={() => navigation.navigate('Home')}>
          <Image
            source={require('../../assets/img/Arrow.png')}
            style={{ width: 23.03, height: 14 }}
          />
        </TouchableOpacity>
        <Text style={styles.title}>PROFILE</Text>
      </View>

      {/* Add the profile */}
      <View style={styles.profile}>

        <Image source={require('../../assets/img/Card.png')} 
        style={{ top: '10%'}}
        />

        <Text style={ styles.text }> NOT REGISTERED YET? </Text>
        
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.buttons_Login} onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: 'white', textAlign: 'center' , fontWeight: 600 }}>LOG IN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons_Signup} onPress={() => navigation.navigate('Signup')}>
            <Text style={{ color: '#FF7575', textAlign: 'center' , fontWeight: 600}}>SIGN UP</Text>
          </TouchableOpacity>
        </View>

      </View>
      
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    overflow: 'hidden',
    fontFamily: 'JosefinSans',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '5%',
    fontFamily: 'JosefinSans',
  },
  title: {
    marginTop: '15%',
    marginBottom: '15%',
    marginLeft: '25%',
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'JosefinSans',
  },
  text: {
    fontSize: 12,
    color: 'black',
    fontWeight: 500,
    top: '15%',
    fontFamily: 'JosefinSans',
  },
  profile: {
    alignSelf: 'center',
    width: 678 ,
    height: 1225,
    backgroundColor: 'white',
    borderTopLeftRadius: 500,
    borderTopRightRadius: 500,
    // inside
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    width: 358,
    justifyContent: 'space-between',
    marginTop: '31%',
  },
  buttons_Login: {
    backgroundColor: '#FF7575',
    color: 'white',
    borderRadius: 20,
    padding: 10,
    width: 170,
    height: 40,
    fontFamily: 'JosefinSans',
  },
  buttons_Signup: {
    // Size
    width: 170,
    height: 40,
    backgroundColor: '#FFFFFF',
    color: '#FF7575',
    // Shadow
    shadowColor: '#5B0606',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
    elevation: 5,
    // Border
    borderRadius: 20,
    padding: 10,
    fontFamily: 'JosefinSans',
  },
});
