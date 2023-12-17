import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';
import {useUsuarioRegistroApp} from '../../context/usuarioRegistro';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const {autorizado} = useUsuarioRegistroApp();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/informacion" asChild > 
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      
      <Tabs.Screen
        name="register"
        options={{
          title: 'Registrarse',
          tabBarItemStyle: {display: (autorizado == false)?"flex":"none"},
          tabBarIcon: ({ color }) => <TabBarIcon name="user-plus" color={color} />,
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: 'Login',
          tabBarItemStyle: {display: (autorizado == false)?"flex":"none"},
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
      <Tabs.Screen
        name="salir"
        options={{
          title: 'Salir',
          tabBarItemStyle: {display: (autorizado == true)?"flex":"none"},
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
        
      />
      <Tabs.Screen
        name="listapalomas"
        options={{
          title: 'Mis Palomas',
          tabBarItemStyle: {display: (autorizado == true )?"flex":"none"},
          tabBarIcon: ({ color }) => <TabBarIcon name="file-archive-o" color={color} />,
        }}
        
      />
    </Tabs>
  );
}
