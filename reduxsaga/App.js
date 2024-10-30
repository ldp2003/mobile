import {
  View,
  Text,
  FlatList,
  Alert,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {} from '@react-navigation/native';
import { call, put, takeEvery } from 'redux-saga/effects';
import { useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { fetchData } from './components/reduxActions';
import store from './components/store';

//Add
function screenAdd({ navigation, route }) {
  const [text, onChangeText] = React.useState('Input your job');
  const createUserApi = 'https://66fcbb5cc3a184a84d17ccd1.mockapi.io/api/job';
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [job, setJob] = React.useState();
  const handelInput = (event) => {
    event.preventDefault();
    console.log({ text });
    onChangeText({ text });
  };
  const handelSubmit = async (event) => {
    event.preventDefault();
    console.log(text);
    try {
      setIsLoading(true);
      const response = await fetch(createUserApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ job: text }),
      });

      if (response.ok) {
        console.log('Form submitted successfully!');
        onChangeText('Input your job'), navigation.navigate('ScreenList');
      } else {
        console.error('Form submission failed!');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <View style={{ alignItems: 'center', padding: 20 }}>
        <Text style={{ fontStyle: 'roboto', fontWeight: 'bold', fontSize: 20 }}>
          ADD YOUR JOB
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderRadius: 5,
          borderColor: '#9095A0',
          width: '90%',
          alignSelf: 'center',
        }}>
        <Image source={require('./assets/input.png')} />
        <TextInput
          style={{ flex: 1, height: 40, paddingLeft: 10 }}
          onChangeText={onChangeText}
          value={text}
          onChange={handelInput}
        />
      </View>
      <View>
        <TouchableOpacity
          style={{
            margin: 10,
            padding: 10,
            borderRadius: 10,
            backgroundColor: '#00BDD6',
            width: 150,
            alignSelf: 'center',
          }}
          onPress={handelSubmit}>
          <Text
            style={{
              fontStyle: 'roboto',
              alignSelf: 'center',
              color: 'white',
              fontSize: 20,
            }}>
            Finish >
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

type ItemProps = {
  job: string,
  id: string,
  navigation: any,
  isDeleteMode: boolean,
  handleDelete: (id: string) => void,
};
const Item = ({
  job,
  id,
  navigation,
  isDeleteMode,
  handleDelete,
}: ItemProps) => (
  <View
    style={{
      flexDirection: 'row',
      backgroundColor: '#DEE1E678',
      borderRadius: 25,
      padding: 10,
      margin: 10,
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image source={require('./assets/checked.png')} style={{ margin: 5 }} />
      <View style={{ width: 200 }}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ fontStyle: 'Inter', fontWeight: 'bold' }}>
          {job}
        </Text>
      </View>
    </View>
    <View>
      {isDeleteMode ? (
        <TouchableOpacity onPress={() => handleDelete(id)}>
          <Image
            source={require('./assets/x.png')}
            style={{ height: 20, width: 20 }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate('ScreenEdit', { job, id })}>
          <Image source={require('./assets/edit.png')} />
        </TouchableOpacity>
      )}
    </View>
  </View>
);


//Main list
function screenList({ navigation, route }) {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state);
  const [text, onChangeText] = React.useState('Search');
  const [isDeleteMode, setIsDeleteMode] = React.useState(false);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(
  //       'https://66fcbb5cc3a184a84d17ccd1.mockapi.io/api/job'
  //     );
  //     const json = await response.json();
  //     setData(json);
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `https://66fcbb5cc3a184a84d17ccd1.mockapi.io/api/job/${id}`,
        {
          method: 'DELETE',
        }
      );
      if (response.ok) {
        console.log('Job deleted successfully!');
        fetchData();
      } else {
        console.error('Failed to delete job.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

   React.useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }
  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderRadius: 5,
          borderColor: '#9095A0',
          width: '90%',
          alignSelf: 'center',
          marginTop: 10,
        }}>
        <Image source={require('./assets/search.png')} style={{ margin: 10 }} />
        <TextInput
          style={{ flex: 1, height: 40 }}
          onChangeText={onChangeText}
          value={text}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: 'center' }}>
          <FlatList
            style={{ minWidth: '95%' }}
            data={data}
            renderItem={({ item }) => (
              <Item
                job={item.job}
                id={item.id}
                navigation={navigation}
                isDeleteMode={isDeleteMode}
                handleDelete={handleDelete}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ScreenAdd');
            }}>
            <Image source={require('./assets/addCircle.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsDeleteMode(!isDeleteMode)}>
            <Image
              source={require('./assets/x.png')}
              style={{ width: 40, height: 40, marginLeft: 20 }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

//Edit
function screenEdit({ navigation, route }) {
  const { job, id } = route.params;

  const [updatedJob, setUpdatedJob] = React.useState(job);
  const handleSave = async () => {
    try {
      const response = await fetch(
        `https://66fcbb5cc3a184a84d17ccd1.mockapi.io/api/job/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ job: updatedJob }),
        }
      );

      if (response.ok) {
        console.log('Job updated successfully!');
        navigation.navigate('ScreenList');
      } else {
        console.error('Job update failed!');
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <View style={{ alignItems: 'center', padding: 20 }}>
        <Text style={{ fontStyle: 'roboto', fontWeight: 'bold', fontSize: 20 }}>
          EDIT YOUR JOB
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderRadius: 5,
          borderColor: '#9095A0',
          width: '90%',
          alignSelf: 'center',
        }}>
        <Image source={require('./assets/input.png')} />
        <TextInput
          style={{ flex: 1, height: 40, paddingLeft: 10 }}
          onChangeText={setUpdatedJob}
          value={updatedJob}
        />
      </View>
      <View>
        <TouchableOpacity
          style={{
            margin: 10,
            padding: 10,
            borderRadius: 10,
            backgroundColor: '#00BDD6',
            width: 150,
            alignSelf: 'center',
          }}
          onPress={handleSave}>
          <Text
            style={{
              fontStyle: 'roboto',
              alignSelf: 'center',
              color: 'white',
              fontSize: 20,
            }}>
            Finish >
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function screenStart({ navigation, route }) {
  const [text, onChangeText] = React.useState('');
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View >
        <Image source={require('./assets/Image95.png')} style={{alignSelf:'center'}} />
        <View style={{ backgroundColor: 'white', height: '100%' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: 5,
              borderColor: '#9095A0',
              width: '90%',
              alignSelf: 'center',
              marginTop: 10,
            }}>
            <Image
              source={require('./assets/Frame.png')}
              style={{ margin: 10 }}
            />
            <TextInput
              style={{ flex: 1, height: 40 }}
              onChangeText={onChangeText}
              value={text}
              placeholder={'Enter your name'}
              placeholderTextColor={'#BCC1CA'}
            />
          </View>
        </View>
      </View>
      <View>
        <TouchableOpacity style={{backgroundColor:'#00BDD6', borderRadius:5, alignSelf:'center', padding:10,marginTop:30}} onPress={()=>{navigation.navigate("ScreenList")}}>
          <Text style={{textAlign:'center', color:'white'}}>GET STARTED ></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Stack = createNativeStackNavigator();
export default function App() {
  return (
     <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ScreenStart">
        <Stack.Screen name="ScreenStart" component={screenStart}/>
        <Stack.Screen name="ScreenList" component={screenList} />
        <Stack.Screen name="ScreenAdd" component={screenAdd} />
        <Stack.Screen name="ScreenEdit" component={screenEdit} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
