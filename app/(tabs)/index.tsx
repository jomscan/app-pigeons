
import {  StyleSheet ,StatusBar, FlatList , View } from 'react-native';

import Header from '../../components/Header';
import PigeonCard from '../../components/PigeonCard';



export default function TabOneScreen() {

  const Pigeons = [
    {
      name: 'Armando',
      image: require('../../assets/images/Armando.jpg'),
      id: 1,
      url: 'https://www.pipa.be/en/articles/update-armando-sold-1252000-euro-total-revenue-joel-verschoot-auction-2400000-euro-19439'    },
    {
      name: 'Daugter Miss Magic',
      image: require('../../assets/images/daughteermissmagic.jpg'),
      id: 2,
      url:"https://www.pipa.be/es/articles/17657/kees-nijeboer-de-pollen-nl-finishes-second-place-one-day-long-distance-championship-not"
    },
    {
      name: 'Keirin',
      image: require('../../assets/images/keirin.jpg'),
      id: 3,
      url:"https://www.pipa.be/es/articles/13719/marco-braspenning-wieringerwerf-nl-can-count-exceptional-breeding-pair-blue-jeroen-and"
    },
    {
      name: 'New Freddy',
      image: require('../../assets/images/newfreddy.jpg'),
      id: 4,
      url:"https://www.pipa.be/en/articles/porsche-911-new-leading-man-pipa-elite-center-following-his-great-grandfather-new-freddy"
    },
    {
      name: 'Porche 911',
      image: require('../../assets/images/porche911.jpg'),
      id: 5,
      url:"https://www.pipa.be/en/articles/porsche-911-new-leading-man-pipa-elite-center-following-his-great-grandfather-new-freddy"
    },
    {
      name: 'Sedna',
      image: require('../../assets/images/sedna.jpg'),
      id: 6,
      url:"https://www.pipa.be/en/articles/porsche-911-new-leading-man-pipa-elite-center-following-his-great-grandfather-new-freddy"
    },
    {
      name: 'Sunny Boy',
      image: require('../../assets/images/sunnyboy.jpg'),
      id: 7,
      url:"https://www.pipa.be/en/articles/porsche-911-new-leading-man-pipa-elite-center-following-his-great-grandfather-new-freddy"
    },
    {
      name: 'Stayerke',
      image: require('../../assets/images/stayerke.jpg'),
      id: 8,
      url:"https://www.pipa.be/en/articles/porsche-911-new-leading-man-pipa-elite-center-following-his-great-grandfather-new-freddy"
    },
  
  ]
  return (
    
    <View style={styles.container}>
      <Header label="Legendary Pigeons" />
      <FlatList data={Pigeons}
                renderItem={({item}) =>{
                  
                  return <PigeonCard info={({item})}/>
                }}
                keyExtractor={(Pigeons) => Pigeons.id + Pigeons.name} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    
  },
});
