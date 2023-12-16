import React from "react";
import { View, StyleSheet, Text, Dimensions } from 'react-native';

const Header = ({label}:{label:string}) => {
    
    return (
        <View style={style.container}>
            <Text style= {style.labelStyle}>{label}</Text>
        </View>
    );
};

const deviceWidth = Dimensions.get('window').width;                    //Guarda en una constante el ancho de pantalla del disposivo que los este usando

const style = StyleSheet.create({
    container: {
        width: deviceWidth,
        height: 60,
        backgroundColor: '#191C87',
        justifyContent: 'center',
        alignItems: 'center',

    },
    labelStyle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#FFF'
    }
})

export default Header;