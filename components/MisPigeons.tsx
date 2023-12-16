import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image, Alert, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../firebase-config'
import { collection, getFirestore, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { useUsuarioRegistroApp } from "../context/usuarioRegistro";



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);




const MisPigeons = (props:any) => {
    
    const { uidUsuario } = useUsuarioRegistroApp();
    const [nombreP] = useState(props.info.item.nombre);
    const [sexoP] = useState(props.info.item.sexo);
    const [colorP] = useState(props.info.item.color);
    const [numeroP] = useState(props.info.item.numero);


    const showConfirmDialog = (fieldName:string, value:string) => {
        return Alert.alert(
            "Eliminar Paloma?",
            "Esta seguro que quiere eliminar esta paloma?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        props.delete(fieldName, value);
                    },
                },
                {
                    text: "No",
                },
            ]
        );
    };



    function mio() {
        console.log('------------------------------------------------------------------------------')
        router.push({ pathname: '/views/agregarpalomas', params: { nombreP, sexoP, colorP, numeroP } });
        console.log(nombreP)

    }


    return (

        <View style={style.cardContainer} >

            <View>
                <Image style={style.imageStyle} source={require('../assets/images/paloma-de-carreras.jpg')} />
            </View>
            <View style={style.contenedorTexto}>
                <Text style={style.nameStyle}>Nombre : {nombreP}</Text>
                <Text style={style.nameStyle}>Sexo : {sexoP}</Text>
                <Text style={style.nameStyle}>Color : {colorP}</Text>
                <Text style={style.nameStyle}>Numero Anilla : {numeroP}</Text>
            </View>
            <View style={style.buttones}>
                <TouchableOpacity><FontAwesome style={style.button} name="refresh" size={30} color={'black'} onPress={() => props.actualiza(nombreP, sexoP, colorP, numeroP)} /></TouchableOpacity>
                <TouchableOpacity><FontAwesome style={style.button} name="trash" size={30} color={'red'} onPress={() => showConfirmDialog('numero', numeroP)} /></TouchableOpacity>
            </View>
        </View>

    );
}

const devideWidth = Math.round(Dimensions.get('window').width);

const style = StyleSheet.create({
    cardContainer: {
        width: devideWidth - 25,
        backgroundColor: '#FFF',
        height: 130,
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
        marginTop: 10,
        marginLeft: 10

    },
    imageStyle: {
        height: 120,
        width: devideWidth - 260,
        borderRadius: 20,
        opacity: 0.9,
        backgroundColor: 'black',
        alignContent: 'center',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5
    },
    nameStyle: {
        textAlign: 'left',
        padding: 3,
        color: 'black',
        fontSize: 14,
        marginTop: 5

    },
    buttones: {
        alignItems: 'center',
        height: 170,
        width: 40,
        justifyContent: 'flex-start',
        marginTop: 10
    },
    button: {
        padding: 5
    },
    contenedorTexto: {
        width: 180
    }

})

export default MisPigeons;