import { Text, View, Image, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function Screen1({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          flex: 3,
          alignItems: 'center',
          justifyContent: 'center',
          
        }}>
        <Image
          source={require('./assets/vs_blue.png')}
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
        <View style={{flexDirection: 'row', alignItems:'Center', paddingTop:15}}>
          <View style={{ flexDirection: 'row',}}>
            <Image source={require('./assets/star.png')} />
            <Image source={require('./assets/star.png')} />
            <Image source={require('./assets/star.png')} />
            <Image source={require('./assets/star.png')} />
            <Image source={require('./assets/star.png')} />
          </View>
          <Text
            style={{ fontStyle: 'roboto', fontSize: 15,paddingLeft:20 }}>
            (Xem 828 Danh gia)
          </Text>
        </View>
        <View style={{flexDirection:'row', alignItems:'center', paddingTop:15}}>
          <Text style={{ fontStyle: 'roboto', fontWeight: 'bold', fontSize: 18}}>1.790.000 d</Text>
          <Text style={{ fontStyle: 'roboto', fontSize: 15 },{textDecorationLine: 'line-through', paddingLeft:20}}>1.790.000 d</Text>
        </View>
        <View style={{flexDirection:'row', alignItems:'center', paddingTop:15}}>
          <Text style={{fontStyle: 'roboto', fontSize: 12, fontWeight:'bold', color:'#FA0000', paddingRight:10}}>O dau re hon hoan tien</Text>
          <Image source={require('./assets/Group_1.png')}/>
        </View>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', paddingTop:15}}>
          <Button title='4 mau - chon mau >' onPress= {()=> navigation.navigate('Screen2')}/>
        </View>
      </View>
      
      <View style={{flex:1, justifyContent:'flex-end', paddingBottom:5}}>
        <TouchableOpacity style={{backgroundColor:'#CA1536', width:300, height:30, borderRadius:5}}>
        <View style={{flex:1, justifyContent:'center'}}>
          <Text style={{fontStyle:'roboto', color:'white', textAlign:'center'}}>CHON MUA</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Screen2({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{flex:1}}>
      </View>
      <View style={{flex:3, backgroundColor:'gray'}}>
        <View>
          <Text>Chon mot mau ben duoi:</Text>
          <View style={{flex:1, alignItems:'center', justifyContent:'Space-around'}}>
          <TouchableOpacity style={{backgroundColor:'#CA1536', width:60, height:60}}>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor:'#CA1536', width:60, height:60}}>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor:'#CA1536', width:60, height:60}}>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor:'#CA1536', width:60, height:60}}>
          </TouchableOpacity>
          </View>
        </View>
        <View>
          <Button title='Xong'/>
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
