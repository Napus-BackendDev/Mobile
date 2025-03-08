import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Image ,TouchableOpacity} from 'react-native';

export default function ProfileLG() {
  return (
    <LinearGradient
      colors={['#EFB6C8', '#8B87CC', '#EFB6C8']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}
    >
      <View style={ styles.header }>
        <TouchableOpacity>
          <Image
            source={require('../../assets/Arrow.png')}
            style={{ width: 23.03, height: 14 }}
          />
        </TouchableOpacity>
        <Text style={styles.title}>PROFILE</Text>
      </View>


      <View style={ styles.profile }>

        {/* Profile Picture */}
        <Image
          source={require('../../assets/pic/pic.jpg')}
          style={{ width: 89, height: 86, marginTop: '-6%', position: 'absolute', alignSelf: 'center', borderRadius: 50 , borderWidth: 3  , borderColor: 'white'}}
        />

        {/* Profile Name */}
        <View style={{ alignItems: 'center', flexDirection: 'row', top: '5.5%' }}>
          <Text style={{fontSize: 14 , color: "#FF676F" , fontWeight: 600}}>Napus Samuanpho</Text>
            <TouchableOpacity>
              <Image source={require('../../assets/img/Profile_icon/Edit.png')}
              style={{ width: 12, height: 12, marginLeft: 5 }}
              />
            </TouchableOpacity>
        </View>

        {/* Profile Email */}
        <View style={{ alignItems: 'center', flexDirection: 'row', top: '7%' }}>
          <Text style={{fontSize: 12 , color: "black" , fontWeight: 400}}>Napus.sam@gmail.com</Text>
            <TouchableOpacity>
              <Image source={require('../../assets/img/Profile_icon/EditEmail.png')}
              style={{ width: 10, height: 10, marginLeft: 5 }}
              />
            </TouchableOpacity>
        </View>

        {/* Profile History */}
        <View style={ styles.history}>
          
          {/* History Header */}
          <View style={{ flexDirection: 'row', marginTop: 15, width: 300 , justifyContent: 'space-between' }}>
            <Text style={{fontSize: 10 , color: "#FF676F" , fontWeight: 700}}>TAROT HISTORY</Text>
            <TouchableOpacity>
              <Text style={{fontSize: 10 , color: "black" , fontWeight: 500}}>SEE ALL</Text>
            </TouchableOpacity>
          </View>

          {/* History Card */}
          <View style={{ flexDirection: 'row', marginTop: 15, width: 300 , height: 138, justifyContent: 'space-between' }}>
            <Image source={require('../../assets/Card/Card1.png')} style={{width: 80,height: 138}}/>
            <Image source={require('../../assets/Card/Card2.png')} style={{width: 80,height: 138}}/>
            <Image source={require('../../assets/Card/Card3.png')} style={{width: 80,height: 138}}/>
          </View>

        </View>
        
        {/* Profile Button [ Purchase , Help , Log out] */}
        <View style={{alignItems: 'center', width: 230, marginTop: 15 , height: 180}}>
            <TouchableOpacity style={styles.Button}>
              <Image source={require('../../assets/img/Profile_icon/History.png')} style={{width:16,height:16}}/>
              <Text style={styles.Button_Text}>PURCHASE HISTORY</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Button}>
              <Image source={require('../../assets/img/Profile_icon/Q.png')} style={{width:10,height:16}}/>
              <Text style={{paddingLeft: 28 ,color: 'black', textAlign: 'center' , fontWeight: 500 , fontSize: 12}}>HELP & SUPPORT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Button} >
              <Image source={require('../../assets/img/Profile_icon/Out.png')} style={{width:16,height:14}}/>
              <Text style={styles.Button_Text}>LOG OUT</Text>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '6.5%',
  },
  title: {
    marginTop: '15%',
    marginBottom: '15%',
    marginLeft: '28%',
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    color: 'black',
    fontWeight: 500,
    top: '15%',
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
  history:{
    marginTop: "18%",
    alignItems: 'center',
    width: 340,
    height: 200,
    backgroundColor: '#F4F8FB',  
    borderRadius: 10,
    // shadow
    shadowColor: '#3E485A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  Button:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 30,
    paddingLeft: 30,
    width: 230,
    height: 40,
    backgroundColor: '#F4F8FB',
    borderRadius: 30,
    marginTop: 30,
  },
  Button_Text:{
    paddingLeft: 24 ,
    color: 'black', 
    textAlign: 'center' , 
    fontWeight: 500 , 
    fontSize: 12
  },
  Card:{

  }
});
