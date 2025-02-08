import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native-web";

export default function AccountScreen({ navigation }) {
    return (
        <View style={{ flex: 1, backgroundColor: "#F9A825" }}>
            <View style={component.header}>
                <Image source={require('../../assets/AccountImage/User2.png')} style={{ width: 70, height: 70 }}></Image>
                <View style={{ height: 50, marginLeft: 16, justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 20, fontWeight: 600 }}>Mr.Wattana Suwanapho</Text>
                    <Text style={{ color: 'white' }}>View Profile</Text>
                </View>
            </View>

            <View style={component.container}>
                <TouchableOpacity style={[styles.option, { height: 70, borderBottomWidth: 1, borderColor: "#EBEBEB" }]} onPress={() => navigation.navigate('ApplyMechanic')}>
                    <Image source={require('../../assets/AccountImage/Apply.png')} style={{ width: 34, height: 34 }}></Image>
                    <Text style={styles.bold}>Apply to be a Mechanic in Quick-Fix</Text>
                </TouchableOpacity>

                <View style={[styles.option, { height: 70, borderBottomWidth: 1, borderColor: "#EBEBEB" }]}>
                    <Image source={require('../../assets/AccountImage/Review.png')} style={{ width: 31, height: 31 }}></Image>
                    <Text style={styles.bold}>Reviewed by me</Text>
                </View>

                <View style={{ width: '100%', height: 160, justifyContent: 'center', borderBottomWidth: 1, borderColor: "#EBEBEB" }}>
                    <View style={styles.option}>
                        <Image source={require('../../assets/AccountImage/Help.png')} style={{ width: 30, height: 30 }}></Image>
                        <Text style={styles.bold}>Help Center</Text>
                    </View>
                    <View style={[styles.subcategory, { height: 75 }]}>
                        <Text>Contact an officer</Text>
                        <Text>Frequently asked questions</Text>
                    </View>
                </View>

                <View style={{ width: '100%', height: 170, justifyContent: 'center', borderBottomWidth: 1, borderColor: "#EBEBEB" }}>
                    <View style={styles.option}>
                        <Image source={require('../../assets/AccountImage/Terms.png')} style={{ width: 31, height: 31 }}></Image>
                        <Text style={styles.bold}>Terms and Policies</Text>
                    </View>
                    <View style={[styles.subcategory, { height: 100 }]}>
                        <Text>Service guarantee</Text>
                        <Text>Terms of Service</Text>
                        <Text>Privacy Policy</Text>
                    </View>
                </View>

                <View style={{ height: 64, justifyContent: 'center', }}>
                    <TouchableOpacity style={styles.button}>
                        <Text>Log-out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const component = StyleSheet.create({
    header: {
        height: 220,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 60
    },
    container: {
        height: 604,
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
    },
});

const styles = StyleSheet.create({
    option: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    subcategory: {
        flexDirection: 'column',
        width: '100%',
        marginTop: 15,
        paddingHorizontal: 40,
        justifyContent: 'space-between',
    },
    button: {
        width: 320,
        height: 40,
        backgroundColor: "#F9A825",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    bold: {
        fontWeight: 600,
        marginLeft: 15,
    },
})