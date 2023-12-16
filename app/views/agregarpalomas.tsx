import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import { addDoc, collection, getFirestore, query, getDocs, where, doc, updateDoc, } from 'firebase/firestore';
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../firebase-config'
import { useUsuarioRegistroApp } from "../../context/usuarioRegistro";
import { Stack, router, useLocalSearchParams } from "expo-router";





const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



type SearchParamType = {
    nombreP: string;
    sexoP: string;
    colorP: string;
    numeroP: string;

};

export default function RegistrarPaloma(props: string) {

    const { nombreP, sexoP, colorP, numeroP } = useLocalSearchParams<SearchParamType>();
    const [nombre, setNombre] = useState<string>(nombreP);
    const [sexo, setSexo] = useState<string>(sexoP);
    const [color, setColor] = useState<string>(colorP);
    const [numero, setNumeroAnilla] = useState(numeroP);
    const { uidUsuario } = useUsuarioRegistroApp();

    function titulo() {
        if (nombreP === undefined) {
            return 'Agregar'
        } else {
            return 'Modificar'
        }
    }


    const actualizarObjetoFirestore = async () => {
        try {
            const q = query(collection(db, 'Palomas'), where('numero', '==', numeroP));
            const querySnapshot1 = await getDocs(q);
            const docRef = doc(collection(db, 'Palomas'), querySnapshot1.docs[0].id);
            await updateDoc(docRef, { nombre, sexo, color });
            console.log('Objeto actualizado correctamente en Firestore');
            
        } catch (error) {
            console.error('Error al actualizar el objeto en Firestore:', error);
        }
    };




    const save = async () => {
        try {
            if (nombre === undefined || sexo === undefined || color === undefined || numero === undefined) {
                Alert.alert('mensaje importante', 'Debes rellenar todos los campos')
            }
            else {
                if (nombreP === undefined) {
                    await addDoc(collection(db, 'Palomas'),
                        {
                            uidUsuario,
                            nombre,
                            sexo,
                            color,
                            numero
                        })
                } else {
                    actualizarObjetoFirestore();
                    
                }
                Alert.alert('Exito', 'Guardado con Exito')
                
                router.back();
                
                
            }
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <View style={styles.padre}>
            <Stack.Screen
                options={{
                    headerTitle: titulo()
                }}
            />
            <View>
                <Image source={require('../../assets/images/logopaloma.png')} style={styles.profile} />
            </View>

            <View style={styles.targeta}>
                <View style={styles.cajaTexto}>
                    <TextInput placeholder="Nombre" style={{ paddingHorizontal: 15 }}
                        value={nombre}
                        onChangeText={(text) => setNombre(text)} />
                </View>
                <View style={styles.cajaTexto}>
                    <TextInput placeholder="Sexo" style={{ paddingHorizontal: 15 }}
                        value={sexo}
                        onChangeText={(text) => setSexo(text)} />
                </View>
                <View style={styles.cajaTexto}>
                    <TextInput placeholder="Color" style={{ paddingHorizontal: 15 }}
                        value={color}
                        onChangeText={(text) => setColor(text)} />
                </View>
                <View style={styles.cajaTexto}>
                    <TextInput placeholder="Numero Anilla" style={{ paddingHorizontal: 15 }}
                        value={numeroP}
                        onChangeText={(text) => setNumeroAnilla(text)} />
                </View>
                <View style={styles.PadreBoton}>
                    <TouchableOpacity style={styles.cajaBoton} onPress={save}>
                        <Text style={styles.TextoBoton}>Guardar</Text>
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
        backgroundColor: '#191C87',
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

