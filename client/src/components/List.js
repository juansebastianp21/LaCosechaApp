import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, Image, Alert, TouchableHighlight, RefreshControl} from 'react-native';
import flatListData from '../../data/flatListData';
import Swipeout from 'react-native-swipeout';
import AddModal from './AddModal';
import EditModal from './EditModal';
import { getFoodsFromServer} from '../../networking/server'
const BaseUrl = 'http://10.0.2.2:3000/products/'

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRowKey: null,
            numberOfRefresh: 0,
            item: {}
        };
    }

    refreshFlatListItem = (changedItem) => {
        this.setState({ item: changedItem});
    }

    render(){
        const swipeSettings = {
            autoClose: true,
            onClose: (secId, rowId, direction) => {
                if (this.state.activeRowKey != null){
                    this.setState({ activeRowKey: null});
                }
                
            },
            onOpen: (secId, rowId, direction) => {
                this.setState({ activeRowKey: this.props.item._id});
            },
            right: [
                {
                    onPress: () => {
                        //alert('Update')
                        //this.props.parentFlatList.refs.editModal.showEditModal(flatListData[this.props.index], this);
                        let selectedItem = this.state.item.name ? this.state.item: this.props.item;
                        this.props.parentFlatList.refs.editModal.showEditModal(selectedItem, this);
                    },
                    text: 'Edit', type: 'primary'
                },
                {
                    onPress: () => {
                        const deletingRow = this.state.activeRowKey;
                        Alert.alert(
                            'Alert',
                            '¿Esta seguro que desea eliminar este producto?',
                            [
                                {text: 'No', onPress: () => console.log('Cancel presionado'), style: 'cancel'},
                                {text: 'Aceptar', onPress:() => {
                                    //flatListData.splice(this.props.index, 1);
                                    //Refresh list
                                    const del = '/delete';
                                    const delteUrl =  BaseUrl + this.props.item._id + del;
                                    //alert(delteUrl);
                                    fetch(delteUrl,{
                                        method: 'DELETE',
                                    }).then(res => res.json())
                                    .then(res => {
                                        this.props.parentFlatList.refreshDataFromServer();
                                    }).catch((error)=>{
                                        alert(error);
                                    })
                                
                                    
                                    
                                }}
                            ],
                            {cancelable: true}
                        );

                    },
                    text: 'Delete',
                    type: 'delete'
                }
            ],
            rowId: this.props.index,
            sectionId: 1
        }

        return(
            <Swipeout {...swipeSettings}>

                <View style={{
                        flex: 1,
                        flexDirection: 'column'
                    }}>
                        <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        backgroundColor: '#ffffff',
                    }}>
                    <Image
                        source={{uri : this.props.item.image_url}}
                        style={styles.ItemImage}
                    >
                    </Image>
                    <View style={styles.textContainer}>
                        <Text style={styles.ItemText}>{this.state.item.name ? this.state.item.name: this.props.item.name}</Text>
                        <Text style={styles.ItemText}>{this.state.item.price ? this.state.item.price: this.props.item.price}</Text>
                        <Text style={styles.ItemText}>{this.state.item.description ? this.state.item.description: this.props.item.description}</Text>
                    </View>
                    
                    </View>
                    <View style={{
                        height: 2,
                        backgroundColor:'#d50000'
                    }}>

                    </View>
                </View>

            </Swipeout>
            
            
        );
    }
}


export default class List extends Component{
    constructor(props) {
        super(props);
        this.state = ({
            deletedRowKey: null,
            loading: false,
            foodsFromServer: [],
            url: 'http://10.0.2.2:3000/products'
        });
        this._onPressAdd = this._onPressAdd.bind(this);
    }

    componentDidMount() {
        this.refreshDataFromServer();
    }

    refreshDataFromServer= ()=> {
        this.setState({loading:true});
        fetch(this.state.url)
        .then( res => res.json())
        .then((foods) => {

            this.setState({ foodsFromServer: foods.products, loading: false});
        }).catch((error) => {
            this.setState({ foodsFromServer: [], loading: false});
        });
    }

    onRefresh = () => {
        this.refreshDataFromServer();
    }

    refreshList = (activeKey) => {
        this.setState((prevState) => {
            return {
                deletedRowKey: activeKey
            };
        });
    }

    _onPressAdd() {
        //alert("Se agregó un producto")
        this.refs.addModal.showAddModal();
    }
    render() {
        
        return (
          <View style={{flex: 1}}>
            <View style={{backgroundColor: '#8d6e63', height: 64, justifyContent: 'space-between', flexDirection: 'row', alignItems:'center'}}>
                <Text style={{paddingLeft:10, color: 'white', fontSize: 20,}}>La Cosecha Parrillada</Text>
                <TouchableHighlight style={{marginRight: 10}} underlayColor='#8d6e63' onPress={this._onPressAdd}>
                    <Image style={{width: 35, height: 35}} source={require('../../icons/redAddIcon.png')}/>
                </TouchableHighlight>
                
                
            </View>

            <FlatList
                //data={flatListData}
                data={this.state.foodsFromServer}
                renderItem={({item, index})=>{
                    return (
                        <ListItem item={item} index={index} parentFlatList={this}>

                        </ListItem>
                    );
                }}
                keyExtractor={(item, index) => item.name}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.loading}
                        onRefresh={this.onRefresh}
                    />
                }
            />
            <AddModal ref={'addModal'} parentFlatList={this}>

            </AddModal>
            <EditModal ref={'editModal'} parentFlatList={this}>

            </EditModal>
          </View>
        );
      
      
    }
  }


  const styles = StyleSheet.create({
    ItemText: {
        color: '#8d6e63',
        padding: 5,
        fontSize: 16
    },
    ItemImage: {
        width: 100,
        height: 100,
        margin: 5
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column'
    }
  });