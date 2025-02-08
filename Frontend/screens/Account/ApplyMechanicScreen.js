import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native-web";

export default function ApplyMechanicScreen({ navigation }) {
    return (
        <View style={{ backgroundColor: 'white', alignItems: 'center' }}>
            <View style={component.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Tab')}>
                    <Image source={require('../../assets/AccountImage/arrow-left.png')} style={{ width: 34, height: 30, }}></Image>
                </TouchableOpacity>
                <View style={{ alignItems: 'center' }}>
                    <Image source={require('../../assets/AccountImage/User2.png')} style={{ width: 137, height: 137 }}></Image>
                </View>
            </View>

            <View style={component.input}>
                <View style={{ width: 170, height: 60 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>First name</Text>
                        <Text style={{ color: '#FF0000' }}> *</Text>
                    </View>
                    <View style={styles.input}>
                        <Text>Wattana</Text>
                    </View>
                </View>

                <View style={{ width: 170, height: 60 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>Last name</Text>
                        <Text style={{ color: '#FF0000' }}> *</Text>
                    </View>
                    <View style={styles.input}>
                        <Text>Suwanapho</Text>
                    </View>
                </View>

                <View style={{ width: 300, height: 60 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>Address</Text>
                        <Text style={{ color: '#FF0000' }}> *</Text>
                    </View>
                    <View style={styles.input}>
                        <Text>333 Lamduan ,Thasut,Maeng,Chaing Rai</Text>
                    </View>
                </View>

                <View style={{ width: 40, height: 60 }}>
                    <View style={[styles.input, { marginTop: 23 }]}>
                        <Image source={require('../../assets/AccountImage/Pin.png')} style={{ width: 20, height: 20 }}></Image>
                    </View>
                </View>

                <View style={{ width: 160, height: 60 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>Postal code</Text>
                        <Text style={{ color: '#FF0000' }}> *</Text>
                    </View>
                    <View style={styles.input}>
                        <Text>57100</Text>
                    </View>
                </View>

                <View style={{ width: 180, height: 60 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>Phone Number</Text>
                        <Text style={{ color: '#FF0000' }}> *</Text>
                    </View>
                    <View style={styles.input}>
                        <Text>0978649876</Text>
                    </View>
                </View>

                <View style={{ width: 360, height: 60 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>Email</Text>
                    <Text style={{ color: '#FF0000' }}> *</Text>
                    </View>
                    <View style={styles.input}>
                        <Text>6631503036@lamduan.mfu.ac.th</Text>
                    </View>
                </View>
            </View>

            <View style={component.button}>
                <TouchableOpacity style={styles.button}>
                    <Text>Confirm</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const component = StyleSheet.create({
    header: {
        width: 360,
        height: 190,
        marginTop: 50,
    },
    input: {
        justifyContent: 'space-between',
        width: 360,
        height: 270,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    button: {
        alignItems: 'center',
        height: 70,
        marginTop: 270,
    },
});

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        backgroundColor: '#EBEBEB',
        borderRadius: 10,
        paddingLeft: 10,
        marginTop: 4,
    },
    button: {
        width: 360,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#F9A825',
        alignItems: 'center',
        justifyContent: 'center',
    },
});