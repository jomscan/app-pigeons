import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, FlatList, TouchableOpacity, Alert, ActivityIndicator, RefreshControl } from "react-native";
import { useUsuarioRegistroApp } from "../../context/usuarioRegistro";
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../../firebase-config'
import MisPigeons from '../../components/MisPigeons';
import { collection, deleteDoc, doc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { FontAwesome } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";


export default function ListaPalomas() {

    const { uidUsuario } = useUsuarioRegistroApp();
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);


    const [data, setData] = useState<any>([]);
    const [update, setUpdate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        setRefreshing(true);
        try {
            const q = query(collection(db, 'Palomas'), where('uidUsuario', '==', uidUsuario));
            const querySnapshot1 = await getDocs(q);
            const items = querySnapshot1.docs.map((doc) => doc.data())
            setData(items);
        } catch (error) {
            console.log(error)
        }
        setLoading(false);
        setRefreshing(false);
    };


    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setUpdate(true);
        fetchData();
    }, [update]);

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );

    const agregarPaloma = () => {
        router.push("/views/agregarpalomas");
    }

    const borrarPaloma = async (fieldName: string, value: string) => {
        try {
            const collectionRef = collection(db, 'Palomas');
            const q = query(collectionRef, where(fieldName, '==', value));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                querySnapshot.forEach(async (doc) => {
                    await deleteDoc(doc.ref);
                    Alert.alert('Eliminar Palomas', 'Paloma eliminada correctamente')
                    console.log(`Elemento con ${fieldName} ${value} eliminado con éxito.`);
                    fetchData();
                });
            } else {
                console.log(`No se encontró ningún documento con ${fieldName} ${value}.`);
            }
        } catch (error) {
            console.error('Error al eliminar el elemento:', error);
        }
    };

    if (loading) {
        return (
            <View>
                <View>
                    <ActivityIndicator size='large' color='#284796' />
                </View>
            </View>
        );
    };

    const actualizaPaloma = (nombreP: string, sexoP: string, colorP: string, numeroP: string) => {
        router.push({ pathname: '/views/agregarpalomas', params: { nombreP, sexoP, colorP, numeroP } });
    }

    return (

        <View style={styles.container}>
            <View>
                <FlatList data={data}
                    renderItem={({ item }) => {
                        return <MisPigeons info={({ item })} delete={borrarPaloma} actualiza={actualizaPaloma} />
                    }}
                    keyExtractor={(Pigeons) => Pigeons.id + Pigeons.nombre}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
                    }
                />
            </View>
            <TouchableOpacity style={styles.floatingButton} onPress={() => agregarPaloma()}><FontAwesome name="plus-circle" size={60} color={'#191C87'} /></TouchableOpacity>
        </View>
    );
}

const devideWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',


    },
    floatingButton: {
        position: 'absolute',
        alignContent: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        right: 20,
        bottom: 50,

    }
});