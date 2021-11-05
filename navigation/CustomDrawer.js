import React from 'react';
import {
    View,Text,Image,TouchableOpacity
} from 'react-native';
import {
    createDrawerNavigator,
    DrawerContentScrollView
} from '@react-navigation/drawer';

import { MainLayout } from '../screens';
import{
    COLORS,
    FONTS,
    constants,
    icons,
    dummyData
}from '../constants';

const Drawer = createDrawerNavigator();

const CustomDrawer =()=>{
    return (
        <View 
             style={{
                 flex:1,
                 backgroundColor:COLORS.primary
             }}>
             <Drawer.Navigator
                drawerType="slide"
                overlayout="Transparent"
                drawerStyle={{
                    flex:1,
                    width:"65%",
                    paddingRight:20,
                    backgroundColor:'transparent'
                }}
                sceneContainerStyle={{backgroundColor:'transparent'}}
                initailRouteName="MainLayout"
                >
                <Drawer.Screen
                name="MainLayout">
                {props => <MainLayout {...props} />}
                </Drawer.Screen>

             </Drawer.Navigator>


             </View>
    )
}

export default CustomDrawer;