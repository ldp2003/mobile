import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import React, {useState} from 'react';

type ItemData = {
  id: string;
  title: string;
  shop: string;
  image: any;
};
const DATA: ItemData[] = [
  {
    id: 'it1',
    title: 'Ca nấu lẩu, nấu mì mini abc',
    shop: 'Devang',
    image: require('./assets/ca_nau_lau.png'),
  },
  {
    id: 'it2',
    title: '1KG KHÔ GÀ BƠ TỎI CỰC NGON',
    shop: 'LTD Food',
    image:require('./assets/ga_bo_toi.png'),
  },
  {
    id: 'it3',
    title: 'Xe cần cẩu đa năng',
    shop: 'Thế giới đồ chơi',
    image:require('./assets/xa_can_cau.png'),
  },
  {
    id:'it4',
    title:'Đồ chơi dạng mô hình',
    shop: 'Thế giới đồ chơi',
    image:require('./assets/do_choi_dang_mo_hinh.png'),
  },
  {
    id: 'it5',
    title:'Lãnh đạo giản đơn',
    shop:'Minh Long Book',
    image:require('./assets/lanh_dao_gian_don.png'),
  },
  {
    id: 'it6',
    title:'Hiểu lòng con trẻ',
    shop:'Minh Long Book',
    image:require('./assets/hieu_long_con_tre.png'),
  },
  {
    id: 'it7',
    title: 'Donald Trump Thiên tài lãnh đạo',
    shop:'Minh Long Book',
    image:require('./assets/trump.png'),
  }
];

type ItemProps = { item: ItemData; onPress: () => void;
  backgroundColor: string;
  textColor: string; };
const Item = ({ item, onPress, backgroundColor, textColor }: ItemProps) => (
  <TouchableOpacity onPress={onPress} style={{backgroundColor}}>
  <View style={{flexDirection:'row', borderBottomColor: '#C4C4C4', borderBottomWidth: 1, justifyContent:'space-evenly'}}>
    <Image source={item.image}/>
    <View style={{ width:150 }}>
      <Text numberOfLines={1} ellipsizeMode='tail' style={{color:textColor}}>{item.title}</Text>
      <Text style={{marginTop:15, color:textColor}}>Shop {item.shop}</Text>
    </View>
    <TouchableOpacity
          style={{
            backgroundColor: '#F31111',
            width: 70,
            height:'50%',
            borderRadius: 5,
            alignSelf:'center'
          }}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text
              style={{
                fontStyle: 'roboto',
                color: 'white',
                textAlign: 'center',
              }}>
              Chat
            </Text>
          </View>
        </TouchableOpacity>
  </View>
  </TouchableOpacity>
);
export default function App() {
const [selectedId, setSelectedId] = useState();

  const renderItem = ({item}: {item: ItemData}) => {
    const backgroundColor = item.id === selectedId ? '#1BA9FF' : '#white';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <View style={{ height: '100%' }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          minHeight: 42,
          maxHeight: 42,
          backgroundColor: '#1BA9FF',
        }}>
        <Image
          source={require('./assets/arrow.png')}
          style={{ marginLeft: 20 }}
        />
        <Text style={{ fontStyle: 'roboto', fontSize: 20, color: '#FFFFFF' }}>
          Chat
        </Text>
        <Image
          source={require('./assets/cart.png')}
          style={{ marginRight: 20 }}
        />
      </View>
      <View style={{ borderBottomColor: '#C4C4C4', borderBottomWidth: 1 }}>
        <View style={{ margin: 15 }}>
          <Text style={{ fontStyle: 'roboto', fontSize: 13 }}>
            Bạn có thắc mắc với sản phẩm vừa xem. Đừng ngại chat với shop!{' '}
          </Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{paddingBottom:42}}>
        <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
       />
      </ScrollView>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          minHeight: 42,
          maxHeight: 42,
          backgroundColor: '#1BA9FF',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          paddingLeft:20,
          paddingRight:20
        }}>
          <Image source={require('./assets/Group_10.png')}/>
          <Image source={require('./assets/home.png')}/>
          <Image source={require('./assets/back.png')}/>
        </View>
    </View>
  );
}
