import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Alert } from "react-native";
import { useUsuarioRegistroApp } from '../context/usuarioRegistro';



const PigeonCard = (props:any) => {
    const url = props.info.item.url;
    const { autorizado } = useUsuarioRegistroApp();
    function estaAutorizado() {
        if (autorizado) {
            router.push(url);
        } else {
            Alert.alert("Debe usted iniciar sesion para ver esta informacion")
        }
    }
    return (
        <View style={style.cardContainer}>
            <View>
                <Image style={style.imageStyle} source={props.info.item.image} />
                <Text style={style.nameStyle}>{props.info.item.name}</Text>
            </View>
            <View>
                <TouchableOpacity
                    style={style.button}
                    onPress={() => estaAutorizado()}
                >
                    <Text style={style.textButton}>+ Info</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const devideWidth = Math.round(Dimensions.get('window').width);

const style = StyleSheet.create({
    cardContainer: {
        width: devideWidth - 25,
        backgroundColor: '#FFF',
        height: 210,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.75,
        shadowRadius: 5,
        elevation: 9,
        flexDirection: 'row',
        marginTop: 10

    },
    imageStyle: {
        height: 180,
        width: devideWidth - 130,
        borderTopLeftRadius: 20,
        opacity: 0.9,
    },
    nameStyle: {
        fontSize: 20,
        fontWeight: '900',
        textAlign: 'center',
        verticalAlign: 'bottom'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#A48220',
        height: 210,
        width: 105,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: 'center',
    },
    textButton: {
        color: '#FFF',
        fontSize: 25
    }

})



export default PigeonCard;