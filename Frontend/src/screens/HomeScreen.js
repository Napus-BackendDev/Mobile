import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from 'expo-font';

export default function HomeScreen({ navigation }) {
    const [fontsLoaded] = useFonts({
        'JosefinSans': require('../../assets/fonts/JosefinSans.ttf'),
    });

    const [age, setAge] = useState();

    const [selectedMale, setSelectedMale] = useState(false);
    const [selectedFemale, setSelectedFemale] = useState(false);
    const [selectedLgbt, setSelectedLgbt] = useState(false);
    const [selectedNot, setSelectedNot] = useState(false);

    const [skipAnim, setSkipAnim] = useState(false);

    return (
        <LinearGradient 
            colors={['#EFB6C8', '#8B87CC', '#EFB6C8']} 
            start={{ x: 0.05, y: 0.05 }}
            end={{ x: 0.95, y: 0.95 }}
            style={styles.container}
        >
            {/* Topic */}
            <Text style={ component.name }>FORTUNE</Text>

            {/* Navigation Tab */}
            <View style={ styles.navigation }>
                <TouchableOpacity style={ component.navigator } onPress={() => navigation.navigate('Profile')}>PROFILE</TouchableOpacity>
                <View style={ component.line }/>
                <TouchableOpacity style={ component.navigator }>STORE</TouchableOpacity>
            </View>

            {/* Personal Tab */}
            <View style={ styles.personal }>
                <Text style={ component.topic }>PERSONAL</Text>
                <LinearGradient 
                    colors={['#EFB6C8', '#8B87CC']} 
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    style={ component.topicLine }
                />
                <View style={ part.personal }>
                    <View style={{ width: 220 }}>
                        <Text style={ component.subTopic }>GENDER</Text>
                        <View style={ part.gender }>
                            <View style={ part.genderButton }>
                                <TouchableOpacity 
                                    style={ component.genderButton }
                                    onPress={() => {setSelectedMale(!selectedMale), selectedMale === false ? (setSelectedFemale(false), setSelectedLgbt(false), setSelectedNot(false)) : ''}}
                                >
                                    {selectedMale && <View style={ component.innerRadio }/>}
                                </TouchableOpacity>
                                <Text style={ component.genderText }>MALE</Text>
                            </View>
                            <View style={ part.genderButton }>
                                <TouchableOpacity 
                                    style={ component.genderButton }
                                    onPress={() => {setSelectedFemale(!selectedFemale), selectedFemale === false ? (setSelectedMale(false), setSelectedLgbt(false), setSelectedNot(false)) : ''}}
                                >
                                    {selectedFemale && <View style={ component.innerRadio }/>}
                                </TouchableOpacity>
                                <Text style={ component.genderText }>FEMALE</Text>
                            </View>
                            <View style={ part.genderButton }>
                                <TouchableOpacity 
                                    style={ component.genderButton }
                                    onPress={() => {setSelectedLgbt(!selectedLgbt), selectedLgbt === false ? (setSelectedFemale(false), setSelectedMale(false), setSelectedNot(false)) : ''}}
                                >
                                    {selectedLgbt && <View style={ component.innerRadio }/>}
                                </TouchableOpacity>
                                <Text style={ component.genderText }>LGBTQ+</Text>
                            </View>
                            <View style={ part.genderButton }>
                                <TouchableOpacity 
                                    style={ component.genderButton }
                                    onPress={() => {setSelectedNot(!selectedNot), selectedNot === false ? (setSelectedFemale(false), setSelectedLgbt(false), setSelectedMale(false)) : ''}}
                                >
                                    {selectedNot && <View style={ component.innerRadio }/>}
                                </TouchableOpacity>
                                <Text style={ component.genderText }>DO NOT INDENTITY</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[ component.line, { height: 70, marginHorizontal: 15, alignSelf: 'end', } ]}/>
                    <View>
                        <Text style={ component.subTopic }>AGE</Text>
                        <View style={ part.age }>
                            <TextInput 
                                style={ component.ageInput }
                            />
                        </View>
                    </View>
                </View>
                <Text style={ component.info }>THIS INFORMATION IS NOT NECESSARY, IT IS USED TO PERSONALIZE THE PREDICTIONS FOR YOU</Text>
            </View>

            {/* Category Tab */}
            <View style={ styles.category }>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }}>
                    <View>
                        <Text style={ component.topic }>CATEGORY</Text>
                        <LinearGradient 
                            colors={['#EFB6C8', '#8B87CC']} 
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            style={ component.topicLine }
                        />
                    </View>
                    <View style={ part.skipAnim }>
                        <Text style={ component.skipText }>SKIP ANIMATION</Text>
                        <TouchableOpacity 
                            style={ component.skipButton }
                            onPress={() => {setSkipAnim(!skipAnim)}}
                        >
                            {skipAnim && <View style={ component.innerRadio }/>}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={ part.category }>
                    <View style={ part.categoryButton }>
                        <TouchableOpacity onPress={() => navigation.navigate('Daily')}>
                            <LinearGradient
                                colors={['#FFB6C2', '#FFDFA3']}
                                start={{ x: 1, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={ component.categoryButton }
                            />
                            <Image source = {require('../../assets/img/Smile.png')} style = { component.categoryImage }/>
                        </TouchableOpacity>
                        <Text style={[ component.categoryText, {color: '#FF6258'} ]}>DAILY</Text>
                    </View>
                    <View style={ part.categoryButton }>
                        <TouchableOpacity>
                            <LinearGradient
                                colors={['#D6BFFF', '#47CECE']}
                                start={{ x: 1, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={ component.categoryButton }
                            />
                            <Image source = {require('../../assets/img/Calendar.png')} style = { component.categoryImage }/>
                        </TouchableOpacity>
                        <Text style={[ component.categoryText, {color: '#9D86DA'} ]}>MONTHLY</Text>
                    </View>
                    <View style={ part.categoryButton }>
                        <TouchableOpacity>
                            <LinearGradient
                                colors={['#A0FFBA', '#00C268']}
                                start={{ x: 1, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={ component.categoryButton }
                            />
                            <Image source = {require('../../assets/img/Plus.png')} style = { component.categoryImage }/>
                        </TouchableOpacity>
                        <Text style={[ component.categoryText, {color: '#40DB7B'} ]}>HEALTH</Text>
                    </View>
                    <View style={ part.categoryButton }>
                        <TouchableOpacity>
                            <LinearGradient
                                colors={['#FFFFA0', '#E7A235']}
                                start={{ x: 1, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={ component.categoryButton }
                            />
                            <Image source = {require('../../assets/img/Dollar.png')} style = { component.categoryImage }/>
                        </TouchableOpacity>
                        <Text style={[ component.categoryText, {color: '#F1B83B'} ]}>FINANCIAL</Text>
                    </View>
                    <View style={ part.categoryButton }>
                        <TouchableOpacity>
                            <LinearGradient
                                colors={['#FFB5B5', '#FF6666']}
                                start={{ x: 1, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={ component.categoryButton }
                            />
                            <Image source = {require('../../assets/img/Heart.png')} style = { component.categoryImage }/>
                        </TouchableOpacity>
                        <Text style={[ component.categoryText, {color: '#FF5252'} ]}>LOVE</Text>
                    </View>
                    <View style={ part.categoryButton }>
                        <TouchableOpacity>
                            <LinearGradient
                                colors={['#A0DFFF', '#159DE2']}
                                start={{ x: 1, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={ component.categoryButton }
                            />
                            <Image source = {require('../../assets/img/Case up.png')} style = {{ position: 'absolute', width: '97%', height: '97%', top: -10, right: 1, }}/>
                            <Image source = {require('../../assets/img/Case down.png')} style = {{ position: 'absolute', width: '90%', height: '90%', bottom: -7, right: 5, }}/>
                        </TouchableOpacity>
                        <Text style={[ component.categoryText, {color: '#437FEE'} ]}>CAREER</Text>
                    </View>
                </View>
            </View>

        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        fontFamily: 'JosefinSans',
    },
    navigation: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        width: 360,
        height: 50,
        borderRadius: 20,
        marginBottom: 40,
    },
    personal: {
        backgroundColor: 'white',
        width: 360,
        height: 210,
        borderRadius: 16,
        padding: 20,
        paddingTop: 15,
        marginBottom: 20,
    },
    category: {
        backgroundColor: 'white',
        width: 360,
        height: 380,
        borderRadius: 16,
        padding: 20,
        paddingTop: 15,
    },
});

const part = StyleSheet.create({
    personal: {
        flexDirection: 'row',
    },
    gender: {
        flexDirection: 'row',
        width: 224,
        marginLeft: -15,
    },
    age: {
        width: 70,
    },
    genderButton: {
        alignItems: 'center',
        width: 60,
    },
    skipAnim: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 118,
    },
    category: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    categoryButton: {
        width: 90,
    },
});

const component = StyleSheet.create({
    name: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 70,
        marginBottom: 50,
    },
    topic: {
        fontSize: 22,
        fontWeight: 600,
        color: '#FF676F',
    },
    subTopic: {
        fontSize: 12,
        color: '#5B5B5B',
        height: 30,
        marginTop: 10,
    },
    navigator: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 180,
        height: '100%',
        fontSize: 14,
        color: '#5B5B5B',
    },
    topicLine: {
        width: 80,
        height: 2,
        borderRadius: 100,
    },
    line: {
        height: 30, 
        width: 1, 
        backgroundColor: '#E6E6E6', 
        borderRadius: 100,
    },
    genderText: {
        fontSize: 10,
        color: '#373737',
        height: 20,
        marginTop: 10,
        textAlign: 'center',
    },
    genderButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 20,
        height: 20,
        backgroundColor: '#EAECF3',
        borderWidth: 1,
        borderColor: '#BBBDC2',
        borderRadius: 4,
    },
    innerRadio: {
        width: '90%',
        height: '90%',
        backgroundColor: '#6483FF',
        borderRadius: '20%',
    },
    ageInput: {
        width: 70,
        height: 50,
        backgroundColor: '#EAECF3',
        borderWidth: 1,
        borderColor: '#BBBDC2',
        borderRadius: 6,
    },
    info: {
        fontSize: 10,
        color: '#FF2323',
        marginTop: 25,
    },
    skipText: {
        fontSize: 12,
        fontWeight: 600,
        color: '#5B5B5B',
    },
    skipButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 13,
        height: 13,
        borderWidth: 1,
        borderColor: '#999999',
        borderRadius: 2,
    },
    categoryText: {
        fontSize: 16,
        fontWeight: 500,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 30,
        color: 'black',
    },
    categoryButton: {
        width: 90,
        height: 90,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    categoryImage: {
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
    },
});