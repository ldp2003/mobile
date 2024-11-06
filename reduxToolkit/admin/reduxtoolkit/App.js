import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput
} from 'react-native';

import React, { useEffect, useReducer, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import {fetchProducts, addProduct} from './components/redux/productSlice'
import { store } from './components/redux/store';

function screenStart({ navigation, route }) {
  return (
    <ScrollView style={styles.container} showsHorizontalScrollIndicator={false}>
      <Text style={styles.paragraph}>
        A premium online store for sporter and their stylish choice
      </Text>
      <View style={styles.backgroundItem}>
        <Image source={require('./assets/bifour_-removebg-preview.png')} />
      </View>
      <Text style={styles.title}>Power Bike</Text>
      <Text style={styles.title}>Shop</Text>
      <TouchableOpacity
        style={styles.buttonStart}
        onPress={() => {
          navigation.navigate('screenHome');
        }}>
        <Text style={styles.buttonStartText}>Get Started</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStart}
        onPress={() => {
          navigation.navigate('screenAdmin');
        }}>
        <Text style={styles.buttonStartText}>Admin</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

type ItemProps={
  id:string,
  title:string,
  price:int,
  image:string,
  desc:string,
  off:int,
  navigation:any
}
// const desc = 'It is a very important form of writing as we write almost everything in paragraphs, be it an answer, essay, story, emails, etc.'
// const DATA: ItemProps[] = [
//   {
//     id:'1',
//     title:'Pinarello',
//     price: 1500,
//     image: require('./assets/bifour_-removebg-preview.png'),
//     off:15,
//     desc:desc
//   },
//   {
//     id:'2',
//     title:'Pina Mountai',
//     price:1500,
//     image: require('./assets/bione-removebg-preview.png'),
//     off:15,
//     desc:desc
//   },
//   {
//     id:'3',
//     title:'Pina bike',
//     price:1500,
//     image: require('./assets/bithree_removebg-preview.png'),
//     off:15,
//     desc:desc
//   },
//   {
//     id:'4',
//     title:'Pinarello',
//     price:1900,
//     image: require('./assets/bitwo-removebg-preview.png'),
//     off:15,
//     desc:desc
//   },
//   {
//     id:'5',
//     title:'Pinarello',
//     price: 2700,
//     image: require('./assets/bithree_removebg-preview.png'),
//     off:15,
//     desc:desc
//   },
//   {
//     id:'6',
//     title:'Pinarello',
//     price:1350,
//     image: require('./assets/bione-removebg-preview.png'),
//     off:15,
//     desc:desc
//   }
// ];
const Item = ({
  id, title, price, image, desc, off, navigation
} : ItemProps) => (
  <TouchableOpacity style={styles.item} onPress={()=>{navigation.navigate('screenAdd', {id, title, price, image, desc, off})}}>
    <Image style={{left:5,position:'absolute'}} source={require('./assets/heart.png')}/>
    <Image source={{uri: image}} style={{height:110, width:120}}/>
    <Text numberOfLines={1} ellipsizeMode='tail' style={{ color:'Pinarello', fontSize:15, fontWeight:'bold'}}>{title}</Text>
    <Text numberOfLines={1} ellipsizeMode='tail' style={{fontSize:15, fontWeight:'bold'}}><Text style={{color:'#F7BA83'}}>$</Text>{price}</Text>
  </TouchableOpacity>
)
function screenHome({ navigation, route }) {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.product);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const [activeButton, setActiveButton] = React.useState('All');
  const renderItem = ({ item }) => (
    <Item {...item} navigation={navigation} />
  );
    if (status === 'loading') {
    return <Text>Loading...</Text>;
  }

  if (status === 'failed') {
    return <Text>Error: {error}</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.homeHeader}>
        <Text style={styles.homeTitle}>The world's Best Bike</Text>
        <View style={styles.homeFilterContainer}>
          <TouchableOpacity
            style={{padding:5, borderWidth: 1, width: 90, borderColor: '#E9414187', borderRadius:5 }}
            key={'All'}
            onPress={()=>{setActiveButton('All')}}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontFamily: 'Voltaire',
                fontSize: 18,
                color: activeButton === 'All' ? '#E94141' : '#BEB6B6',
              }}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{padding:5, borderWidth: 1, width: 90, borderColor: '#E9414187', borderRadius:5 }}
            key={'Roadbike'}
            onPress={()=>{setActiveButton('Roadbike')}}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontFamily: 'Voltaire',
                fontSize: 18,
                color: activeButton === 'Roadbike' ? '#E94141' : '#BEB6B6',
              }}>
              Roadbike
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{padding:5, borderWidth: 1, width: 90, borderColor: '#E9414187', borderRadius:5 }}
            key={'Mountain'}
            onPress={()=>{setActiveButton('Mountain')}}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontFamily: 'Voltaire',
                fontSize: 18,
                color: activeButton === 'Mountain' ? '#E94141' : '#BEB6B6',
              }}>
              Mountain
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={items} 
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        horizontal={false}
        numColumns={2}
      />
    </View>
  );
}

function screenAdd({navigation, route}){
  const {id, title, desc, price, off, image} = route.params;
  const offPrice = price-price*off/100;
  const offValue = price*off/100;
  return(
    <ScrollView style={styles.container}showsHorizontalScrollIndicator={false}>
      <View style={{alignItems:'center'}}>
        <Image source={{uri:image}} style={{ width: 300, height: 300 }}/>
      </View>
      <View>
        <Text style={{marginTop:15,fontWeight:'bold', fontSize:24}}>{title}</Text>
        <View style={{flexDirection:'row'}}>
          <Text style={{flex:1, fontSize:20, color:'#00000096'}}>{off}% OFF {offPrice}$</Text>
          <Text style={{flex:1, fontSize:20, textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>{offValue}</Text>
        </View>
        <Text style={{marginTop:15,fontSize:18, fontWeight:'bold'}}>Description</Text>
        <Text style={{marginTop:1,color:'#00000091', fontStyle:'Voltaire'}}>{desc}</Text>
      </View>
      <View style={{marginTop:15, flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
        <Image source={require('./assets/heart.png')} style={{width:35, height:35}}/>
        <TouchableOpacity style={{ backgroundColor: '#E94141',
    width: '90%',
    alignSelf: 'center',
    padding: 15,
    borderRadius: 30,}}>
          <Text style={styles.buttonStartText}>Add to card</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const ItemAdmin = ({
  id, title, price, image, desc, off, navigation
} : ItemProps) => (
  <TouchableOpacity style={styles.item} onPress={()=>{navigation.navigate('screenAdd', {id, title, price, image, desc, off})}}>
    <Image source={{uri: image}} style={{height:110, width:120}}/>
    <Text numberOfLines={1} ellipsizeMode='tail' style={{color:'Pinarello', fontSize:15, fontWeight:'bold'}}>{title}</Text>
    <Text numberOfLines={1} ellipsizeMode='tail' style={{fontSize:15, fontWeight:'bold'}}><Text style={{color:'#F7BA83'}}>$</Text>{price}</Text>
  </TouchableOpacity>
)
function screenAdmin({navigation, route}){
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.product);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);
  const renderItem = ({ item }) => (
    <ItemAdmin {...item} navigation={navigation} />
  );
    if (status === 'loading') {
    return <Text>Loading...</Text>;
  }

  if (status === 'failed') {
    return <Text>Error: {error}</Text>;
  }
  return(
    <View style={styles.container}>
      <View style={{alignItems:'center'}}>
        <Text style={{color:'#E94141', fontSize:18, fontWeight:'bold'}}>This is Admin page</Text>
        <Text style={{color:'#E94141', fontSize:18, fontWeight:'bold'}}>You can add things from here</Text>
      </View>
      <TouchableOpacity
        style={styles.buttonStart}
        onPress={() => {
          navigation.navigate('screenAddItem');
        }}>
        <Text style={styles.buttonStartText}>Add new item</Text>
      </TouchableOpacity>
      <FlatList
        data={items} 
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        horizontal={false}
        numColumns={2}
      />
    </View>
  );
}

function screenAddItem({navigation, route}){
  const dispatch = useDispatch();

  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [image, setImage] = React.useState('https://loremflickr.com/640/480/sports');
  const [off, setOff] = React.useState('');

  const handleAddProduct = () => {
    const newProduct = {
      id: Math.random().toString(),
      title,
      price: parseFloat(price),
      desc,
      image,
      off: parseInt(off, 10),
    };
    dispatch(addProduct(newProduct));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={{textAlign:'center',color:'#E94141', fontSize:18, fontWeight:'bold'}}>Add New Product</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={desc}
        onChangeText={setDesc}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={image}
        //Image random khong can add
      />
      <TextInput
        style={styles.input}
        placeholder="Discount %"
        value={off}
        onChangeText={setOff}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.buttonStart} onPress={handleAddProduct}>
        <Text style={styles.buttonStartText}>Add Product</Text>
      </TouchableOpacity>
    </View>
  );
}
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="screenStart">
        <Stack.Screen name="screenStart" component={screenStart} />
        <Stack.Screen name="screenHome" component={screenHome} />
        <Stack.Screen name="screenAdd" component={screenAdd} />
        <Stack.Screen name="screenAdmin" component={screenAdmin}/>
        <Stack.Screen name="screenAddItem" component={screenAddItem}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  paragraph: {
    marginTop: 20,
    fontSize: 20,
    textAlign: 'center',
    padding: 15,
    margin: 15,
    fontFamily: 'VT323',
  },
  backgroundItem: {
    backgroundColor: '#E941411A',
    borderRadius: 50,
    padding: 20,
    paddingTop: 60,
    margin: 5,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonStart: {
    backgroundColor: '#E94141',
    width: '90%',
    alignSelf: 'center',
    padding: 15,
    margin: 30,
    borderRadius: 30,
  },
  buttonStartText: {
    color: 'white',
    fontSize: 21,
    fontFamily: 'VT323',
    textAlign: 'center',
  },
  homeHeader: {
    marginTop: 15,
    padding: 15,
  },
  homeTitle: {
    fontFamily: 'Ubuntu',
    color: '#E94141',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  homeFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item:{
    backgroundColor:'#F7BA8326',
    borderRadius:10,
    alignItems:'center',
    padding:5,
    width:150,
    height:180,
    margin:10
  },
  input:{
     height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  }
});
