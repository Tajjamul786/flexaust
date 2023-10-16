/**
 * Copyright (c) 2020
 *
 * This files is used to handle navigation type and screens 
 *
 * @summary Navigation type and screens
 * @author Tajjamul <tajjamul.zaman@nxb.com.pk>
 *
 * Created at     : 2020-09-02 14:15:20 
 * Last modified  : 2020-10-02 11:30:18
 */

import React from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../Screens/SplashScreen';
import Home from '../Screens/Home';
import SideBar from '../Screens/SideBar';
import WhatsNew from '../Screens/WhatsNew';
import AppSolution from '../Screens/AppSolution';
import ProductList from '../Screens/ProductList';
import FindProduct from '../Screens/FindProduct';
import Search from '../Screens/Search';
import WhatsNewDetail from '../Screens/WhatsNewDetail';
import ProdDetail from '../Screens/ProdDetail';
import Contact from '../Screens/Contact';
import Favorite from '../Screens/Favorite';
import DataSheet from '../Components/ProdDetail/DataSheet';
import AppLinks from '../Screens/AppLinks';

const Drawer = createDrawerNavigator();

const NavigationScreens = () => {

    let deviceWidth = Dimensions.get('screen').width;
    let deviceHeight = Dimensions.get('screen').height;
    let sideBarWidth = "100%";
    if (deviceWidth >= 600 && deviceHeight >= 600) {
        sideBarWidth = "50%"
    }


    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerStyle={{
                    width: sideBarWidth
                }}
                drawerContent={(props) => <SideBar {...props} />}
                initialRouteName="Splash"
                backBehavior='history'
                screenOptions={{
                    headerShown: false
                }}
            >
                <Drawer.Screen
                    name="Splash"
                    component={SplashScreen}
                    options={{
                        gestureEnabled: false
                    }}
                />
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="WhatsNew" component={WhatsNew} />
                <Drawer.Screen name="AppSolution" component={AppSolution} />
                <Drawer.Screen name="ProductList" component={ProductList} />
                <Drawer.Screen name="FindProduct" component={FindProduct} />
                <Drawer.Screen name="Search" component={Search} />
                <Drawer.Screen name="WhatsNewDetail" component={WhatsNewDetail} />
                <Drawer.Screen name="ProdDetail" component={ProdDetail} />
                <Drawer.Screen name="Contact" component={Contact} />
                <Drawer.Screen name="Favorite" component={Favorite} />
                <Drawer.Screen name="DataSheet" component={DataSheet} />
                <Drawer.Screen name="AppLinks" component={AppLinks} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};


export default NavigationScreens;
