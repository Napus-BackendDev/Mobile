import React from "react";
import { StyleSheet, View, Text, Image } from "react-native-web";

export default function HomeScreen({ navigation }) {
    return (
        <View style={{ backgroundColor: 'white' }}>
            <View style={component.header}>
                <Image source={require('../../assets/HomeImage/Logo.png')} style={{ width: 40, height: 40, borderRadius: 100 }}></Image>
                <View style={styles.view}>
                    <Image source={require('../../assets/HomeImage/Homeimg2.png')} style={{ width: 259, height: 75, borderRadius: 20 }}></Image>
                    <Text style={styles.text}>Quality Services, wanting{'\n'}for you to choose !</Text>
                </View>
                <Image source={require('../../assets/HomeImage/Chat.png')} style={{ width: 30, height: 30 }}></Image>
            </View>

            <View style={component.service}>
                <Text style={[styles.topic, {marginLeft: 22}]}>Service</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: 6 }}>
                    <View style={styles.serviceList}>
                        <Image source={require('../../assets/HomeImage/Plumbing.png')} style={styles.image}></Image>
                        <Text style={styles.listText}>Plumbing</Text>
                    </View>
                    <View style={styles.serviceList}>
                        <Image source={require('../../assets/HomeImage/Electrical.png')} style={styles.image}></Image>
                        <Text style={styles.listText}>Electrical</Text>
                    </View>
                    <View style={styles.serviceList}>
                        <Image source={require('../../assets/HomeImage/Home clean.png')} style={styles.image}></Image>
                        <Text style={styles.listText}>Home Clean</Text>
                    </View>
                    <View style={styles.serviceList}>
                        <Image source={require('../../assets/HomeImage/Appliance Repair.png')} style={styles.image}></Image>
                        <Text style={styles.listText}>Appliance Repair</Text>
                    </View>
                    <View style={styles.serviceList}>
                        <Image source={require('../../assets/HomeImage/Renovation.png')} style={styles.image}></Image>
                        <Text style={styles.listText}>Renovation</Text>
                    </View>
                    <View style={styles.serviceList}>
                        <Image source={require('../../assets/HomeImage/Carpentry.png')} style={styles.image}></Image>
                        <Text style={styles.listText}>Carpentry</Text>
                    </View>
                    <View style={styles.serviceList}>
                        <Image source={require('../../assets/HomeImage/Smart Home.png')} style={styles.image}></Image>
                        <Text style={styles.listText}>Smart Home</Text>
                    </View>
                    <View style={styles.serviceList}>
                        <Image source={require('../../assets/HomeImage/Handyman.png')} style={styles.image}></Image>
                        <Text style={styles.listText}>Handyman</Text>
                    </View>
                </View>
            </View>

            <View style={component.technician}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 356 }}>
                    <Text style={styles.topic}>Near technician</Text>
                    <Image source={require('../../assets/HomeImage/Magnifier.png')} style={{ width: 20, height: 20 }}></Image>
                </View>
                <View style={styles.technician}>
                    <Image source={require('../../assets/HomeImage/User.png')} style={{ width: 66, height: 66, borderRadius: 100, borderWidth: 4, borderColor: '#C4C4C4', marginHorizontal: 10 }}></Image>
                    <View>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Mr. Plume Mechanic</Text>
                        <Text style={{ fontSize: 10 }}>64 Moo.10, Tha Sut, Muaeng, Chiang Rai 57100</Text>
                        <Image source={require('../../assets/HomeImage/Star.png')} style={{ width: 138, height: 18 }}></Image>
                    </View>
                </View>
                <View style={styles.technician}>
                    <Image source={require('../../assets/HomeImage/User.png')} style={{ width: 66, height: 66, borderRadius: 100, borderWidth: 4, borderColor: '#C4C4C4', marginHorizontal: 10 }}></Image>
                    <View>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Mr. Plume Mechanic</Text>
                        <Text style={{ fontSize: 10 }}>64 Moo.10, Tha Sut, Muaeng, Chiang Rai 57100</Text>
                        <Image source={require('../../assets/HomeImage/Star.png')} style={{ width: 138, height: 18 }}></Image>
                    </View>
                </View>
            </View>
        </View>
    );
}

const component = StyleSheet.create({
    header: {
        height: 140,
        flexDirection: 'row',
        backgroundColor: '#F9A825',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40
    },
    service: {
        height: 300,
    },
    technician: {
        height: 330,
        alignItems: 'center'
    },
});

const styles = StyleSheet.create({
    view: {
        position: 'relative', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginHorizontal: 18, 
    },
    text: {
        position: 'absolute', 
        color: 'white', 
        fontSize: 16, 
        fontWeight: 500, 
        textAlign: 'center'
    },
    image: {
        width: 70,
        height: 70,
    },
    serviceList: {
        alignItems: 'center', 
        justifyContent: 'space-between',
        width: 94,
        height: 94,
        marginVertical: 9,
    },
    listText: {
        fontSize: 11,

    },
    topic: {
        fontSize: 18, 
        fontWeight: 600, 
        marginVertical: 15
    },
    technician: {
        width: 358, 
        height: 100, 
        backgroundColor: '#F4F4F4', 
        borderRadius: 10, 
        borderWidth: 1, 
        borderColor: '#EDEDED',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    }
})