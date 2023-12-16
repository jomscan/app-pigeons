import React, { useState } from "react";
import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import { useUsuarioRegistroApp } from "../../context/usuarioRegistro";
import { router } from "expo-router";
import FirebaseAuth from '../database/firebaseAuth'
import { signInWithEmailAndPassword } from 'firebase/auth'



export default function Login() {

    //creamos la variable de estado
    const [nombre, setNombre] = useState("");
    const [password, setPassword] = useState("");
    const { uidUsuario, setAutorizado,setuidUsuario } = useUsuarioRegistroApp();

    
    const handleSingIn = () => {
        const auth = FirebaseAuth.getAuthInstance();
        signInWithEmailAndPassword(auth, nombre, password)
            .then((userCredential) => {
                console.log('Signed in ')
                console.log(userCredential.user.uid);
                setuidUsuario(userCredential.user.uid);
                setAutorizado();
                router.push("/(tabs)");

            })
            .catch(error => {
                console.log(error)
                Alert.alert(error.message)
            });
    }
    

    return (
        <View style={styles.padre}>

            <View>
                <Image source={require('../../assets/images/usuario.png')} style={styles.profile} />
            </View>

            <View style={styles.targeta}>
                <View style={styles.cajaTexto}>
                    <TextInput placeholder="email" style={{ paddingHorizontal: 15 }}
                        inputMode="email"
                        onChangeText={(text) => setNombre(text)} />
                </View>
                <View style={styles.cajaTexto}>
                    <TextInput placeholder="Password" style={{ paddingHorizontal: 15 }} secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)} />
                </View>
                <View style={styles.PadreBoton}>
                    <TouchableOpacity style={styles.cajaBoton} onPress={handleSingIn}>
                        <Text style={styles.TextoBoton}>Sing In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    padre: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    profile: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: 'white'
    },
    targeta: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

    },
    cajaTexto: {
        paddingVertical: 20,
        backgroundColor: '#cccccc40',
        borderRadius: 30,
        marginVertical: 10
    },
    PadreBoton: {
        alignItems: 'center',
    },
    cajaBoton: {
        backgroundColor: '#525FE1',
        borderRadius: 30,
        paddingVertical: 20,
        width: 150,
        marginTop: 20
    },
    TextoBoton: {
        textAlign: 'center',
        color: 'white'
    }
})