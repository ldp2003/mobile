import { Text, View, Image, Button, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function Screen1({ navigation, route  }) {

  const [imageSource, setImageSource] = useState(require('./assets/vs_blue.png'));

  useEffect(() => {
    if (route.params?.image) {
      setImageSource(route.params.image);
    }
  }, [route.params?.image]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          flex: 3,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={imageSource}
          style={{ height: 250, width: 200 }}
        />
      </View>

      <View style={{ flex: 2 }}>
        <View>
          <Text
            style={{ fontStyle: 'roboto', fontWeight: 'bold', fontSize: 15 }}>
            Dien thoai vsmart JOY 3 - Hang Chinh Hang
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'Center',
            paddingTop: 15,
          }}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={require('./assets/star.png')} />
            <Image source={require('./assets/star.png')} />
            <Image source={require('./assets/star.png')} />
            <Image source={require('./assets/star.png')} />
            <Image source={require('./assets/star.png')} />
          </View>
          <Text style={{ fontStyle: 'roboto', fontSize: 15, paddingLeft: 20 }}>
            (Xem 828 Danh gia)
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 15,
          }}>
          <Text
            style={{ fontStyle: 'roboto', fontWeight: 'bold', fontSize: 18 }}>
            1.790.000 d
          </Text>
          <Text
            style={
              ({ fontStyle: 'roboto', fontSize: 15 },
              { textDecorationLine: 'line-through', paddingLeft: 20 })
            }>
            1.790.000 d
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 15,
          }}>
          <Text
            style={{
              fontStyle: 'roboto',
              fontSize: 12,
              fontWeight: 'bold',
              color: '#FA0000',
              paddingRight: 10,
            }}>
            O dau re hon hoan tien
          </Text>
          <Image source={require('./assets/Group_1.png')} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 15,
          }}>
          <Button
            title="4 mau - chon mau >"
            onPress={() => navigation.navigate('Screen2')}
          />
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 5 }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#CA1536',
            width: 300,
            height: 30,
            borderRadius: 5,
          }}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text
              style={{
                fontStyle: 'roboto',
                color: 'white',
                textAlign: 'center',
              }}>
              CHON MUA
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Screen2({ navigation }) {

  const [imageSource, setImageSource] = useState(
    require('./assets/vs_blue.png')
  );

  const [desc, setDesc] = useState({
    color: 'xanh',
    supplier: 'Tiki Tradding',
    price: '1.790.000 đ',
  });

  const change = (color) => {
    if (color === 'silver') {
      setImageSource(require('./assets/vs_silver.png'));
      setDesc({
        color: 'bạc',
        supplier: 'Tiki Tradding',
        price: '1.790.000 đ'
      });
    } else if ((color === 'red')) {
      setImageSource(require('./assets/vs_red.png'));
      setDesc({
        color: 'đỏ',
        supplier: 'Tiki Tradding',
        price: '1.790.000 đ'
      });
    } else if ((color === 'black')) {
      setImageSource(require('./assets/vs_black.png'));
      setDesc({
        color: 'đen',
        supplier: 'Tiki Tradding',
        price: '1.790.000 đ'
      });
    } else {
      setImageSource(require('./assets/vs_blue.png'));
      setDesc({
        color: 'xang',
        supplier: 'Tiki Tradding',
        price: '1.790.000 đ'
      });
    }
  };
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1, marginRight: 10, marginTop: 10 }}>
          <Image
            id="itemImage"
            source={imageSource}
            style={{ height: '70%', width: '100%' }}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text
            style={{ fontStyle: 'roboto', fontWeight: 'bold', fontSize: 17 }}>
            Dien thoai vsmart JOY 3 - Hang Chinh Hang
          </Text>
          <Text id="desc">
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 15 }}>
                Màu: <Text style={{ fontWeight: 'bold' }}>{desc.color}</Text>
              </Text>
              <Text style={{ fontSize: 15, marginTop: 10 }}>
                Cung cấp bởi {' '}
                <Text style={{ fontWeight: 'bold' }}>{desc.supplier}</Text>
              </Text>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>
                {desc.price}
              </Text>
            </View>
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 3,
          backgroundColor: '#C4C4C4',
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text>Chon mot mau ben duoi:</Text>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#C5F1FB',
                width: 70,
                height: 70,
                marginTop: 50,
              }} onPress={()=>change('silver')}></TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#CA1536',
                width: 70,
                height: 70,
                marginTop: 50,
              }} onPress={()=>change('red')}></TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#000000',
                width: 70,
                height: 70,
                marginTop: 50,
              }} onPress={()=>change('black')}></TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#234896',
                width: 70,
                height: 70,
                marginTop: 50,
              }} onPress={()=>change('blue')}></TouchableOpacity>
          </View>
        </View>
        <View>
          <Button title="Xong" onPress = {() => {navigation.navigate('Screen1', { image: imageSource })}}/>
        </View>
      </View>
    </View>
  );
}
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Screen1">
        <Stack.Screen name="Screen1" component={Screen1} />
        <Stack.Screen name="Screen2" component={Screen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
