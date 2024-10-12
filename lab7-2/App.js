import { Text, SafeAreaView, StyleSheet, View, TextInput, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native';

import React, { useEffect, useReducer,  useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';

type ItemProps = {
  id: string,
  name: string,
  image: string,
  price: string,
  desc: string,
  category: string, //dung de filter
  navigation: any
};
const Item = ({
  id,
  name,
  image,
  price,
  desc,
  category,
  navigation,
}: ItemProps) => (
  <View style={{flexDirection:'row', margin:10,borderRadius:5,backgroundColor:'#F4DDDD'}}>
    <Image style={{margin:5, width: 70, height:70}} source={{uri:image}}/>
    <View>
      <Text style={{fontStyle:'roboto', fontSize:20, fontWeight:'bold'}}>{name}</Text>
      <Text style={{fontStyle:'roboto', fontSize:15, textColor:'#0000008A'}}>{desc}</Text>
      <Text style={{fontStyle:'roboto', fontSize:20, fontWeight:'bold'}}>${price}</Text>
    </View>
    <TouchableOpacity style={{height:20, width:20, position: 'absolute', bottom:25, right:25}} onPress={() => navigation.navigate('screenAdd', {id, category, name, image, price, desc})}>
      <Image source={require('./assets/add.png')}/>
    </TouchableOpacity>
  </View>
);

function screenHome({navigation, route}){
  const [text, onChangeText] = React.useState('');

  const [activeButton, setActiveButton] = React.useState(null);
  const handlePress = (buttonId) => {
    setActiveButton(buttonId);
  };

  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true); 
  const [error, setError] = React.useState(null);
  const [categories, setCategories] = React.useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://6705f762031fd46a8311820f.mockapi.io/donut'
      );
      const json = await response.json();
      setData(json);
      const uniqueCategories = Array.from(new Set(json.map(item => item.category)));
      setCategories(uniqueCategories);
      setActiveButton(uniqueCategories[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const renderItem = ({ item }) => (
    <Item {...item} navigation={navigation} />
  );

  const filteredData = useMemo(() => {
    return data.filter((item) => item.category.toLowerCase() === activeButton.toLowerCase());
  }, [activeButton, data]);
  return (
    <View style ={{flex:1, backgroundColor:'white'}}>
      <View style={{margin:10}}>
        <Text style={{fontStyle:'roboto', fontSize:16, color:'#000000A6'}}>Welcome, Jala!</Text>
        <Text style={{fontStyle:'roboto', fontSize:20,color:'#000000', fontWeight:'bold'}}>Choice you Best food</Text>
      </View>
      <View>
        <TextInput
          style={{margin:10,padding:10, borderWidth:1, borderRadius:5, borderColor:'#C4C4C4'}}
          onChangeText={onChangeText}
          value={text}
          placeholder='Search food'
          placeholderTextColor='#C4C4C4'
        />
      </View>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ margin: 10 }}>
        {categories.map((buttonId) => (
          <TouchableOpacity
            key={buttonId}
            onPress={() => handlePress(buttonId)}
            style={{
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: '#C4C4C4',
              backgroundColor: activeButton === buttonId ? '#F1B000' : 'white',
              marginRight: 10, // Spacing between buttons
            }}
          >
            <Text style={{ fontStyle: 'roboto', fontWeight: 'bold', textAlign: 'center' }}>
              {buttonId}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      </View> 
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          style={{ minWidth: '95%' }}
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false} />
      )}
    </View>
  );
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return Math.max(state - 1, 1); 
    default:
      return state;
  }
};

function screenAdd({navigation, route}){
  const { id, name, price, desc, image } = route.params;
  const [count, dispatch] = useReducer(reducer, 1);
  return(
    <View style={{flex:1, backgroundColor:'white'}}>
      <View style={{flex:3}}>
        <Image source={{uri: image}} style={{height:'100%', width:'100%'}}/> 
      </View>
      <View style={{flex:4}}>
        <View style={{margin:10}}>
          <View>
            <Text style={{fontStyle:'roboto', fontSize:20, fontWeight:'bold'}}>{name}
            </Text>
          </View>
          <View style={{marginTop:10, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}> 
            <Text style={{ fontStyle:'roboto', fontSize:15, textColor:'#0000008A'}}>
              {desc}
            </Text>
            <Text style={{ fontStyle:'roboto', fontSize:20, fontWeight:'bold'}}>${price}
            </Text>
          </View>
        </View>
        <View style={{margin:10, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <View style={{alignItems:'center'}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Image source={require('./assets/clock.png')}/>
              <Text style={{padding:5, fontStyle:'roboto', fontSize:15, textColor:'#0000008A'}}>Delivery in</Text>
            </View>
            <Text style={{ fontStyle:'roboto', fontSize:20, fontWeight:'bold'}}>30 min
            </Text>
          </View>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <TouchableOpacity onPress={() => dispatch({ type: 'decrement'})}>
              <Image source={require('./assets/minus.png')}/>
            </TouchableOpacity>
            <Text style={{margin:10}}>{count}</Text>
            <TouchableOpacity onPress={() => dispatch({ type: 'increment'})}>
             <Image source={require('./assets/plus.png')}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{margin:10}}>
          <Text style={{ fontStyle:'roboto', fontSize:20, fontWeight:'bold'}}>Restaurants Info</Text>
          <Text style={{ fontStyle:'roboto', fontSize:15, textColor:'#0000008A'}}>Order a Large Pizza but the size is the equivalent of a medium/small from other places at the same price range. </Text>
        </View>
        <View style={{padding:10, position:'absolute', bottom:0, width:'100%'}}> 
          <TouchableOpacity style={{padding:10, backgroundColor:'#F1B000', borderRadius:5}}>
            <Text onPress ={() => {navigation.navigate('screenHome')}} style={{color:'white', textAlign:'center', fontStyle:'roboto', fontSize:25, fontWeight:'bold'}}>Add to cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ScreenHome">
        <Stack.Screen name="screenHome" component={screenHome} />
        <Stack.Screen name="screenAdd" component={screenAdd} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


