
import { Text, StyleSheet, View, Image,  TouchableOpacity} from "react-native";
import { useUsuarioRegistroApp } from "../../context/usuarioRegistro";
import { router } from "expo-router";


export default function Login() {

    
   
    const { nombreUsuario,  setAutorizado } = useUsuarioRegistroApp();



    function Cerrar() {
        setAutorizado();
        router.push("/(tabs)");

    }

    return (
        <View style={styles.padre}>

            <View>
                <Image source={require('../../assets/images/usuario.png')} style={styles.profile} />
            </View>

            <View style={styles.targeta}>
                <Text style={styles.textoUsuario}>{nombreUsuario}</Text>
                <Text style={styles.texto}>¿Estas seguro que quieres cerrar sesion?</Text>
                <View style={styles.PadreBoton}>
                    <TouchableOpacity style={styles.cajaBoton} onPress={Cerrar}>
                        <Text style={styles.TextoBoton}>Cerrar sesion</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    texto: {
        textAlign : 'center',
    },
    textoUsuario: {
        textAlign : 'center',
        fontSize : 16
    },

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