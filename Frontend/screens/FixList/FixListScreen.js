import React from "react";
import { StyleSheet, View, Text,  } from "react-native-web";

export default function FixListScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>This is fix list screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});