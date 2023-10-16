/**
 * Copyright (c) 2020
 *
 * This file shows the application solution screen
 *
 * @summary Application Solution
 * @author Tajjamul <tajjamul.zaman@nxb.com.pk>
 *
 * Created at     : 2020-09-17 17:11:25 
 * Last modified  : 2020-10-02 11:47:10
 */


import React, { PureComponent } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet, Dimensions
} from 'react-native';
import ScreenBackground from '../Components/ScreenBackground';
import Header from '../Components/Header';
import axios from 'axios';
import { APIURL } from '../Config/config';
// import AlphabetSectionList from 'react-native-alphabet-sectionlist';
import HTMLView from 'react-native-htmlview';
import { decodeHtml } from '../Config/CommonFunctions';
import ProductList from './ProductList';

export default class AppSolution extends PureComponent {
    constructor() {
        super();
        this.state = {
            data: [],
            sorted: {},
            name: '',

        }
    }

    componentDidMount() {
        // Requets for market App data
        // let { navigation } = this.props;
        axios.get(APIURL + "?data=market-applications")
            .then(res => {
                this.setState({ data: res.data["market applications"] });
                this.sortData(res.data["market applications"]);
            }).catch(err => {
                alert("Solution by Application component did not load")
            })
        // navigation.addListener('focus', () => {
        // })
    }

    //Sort the data in alphabatic sections

    sortData(data) {

        let listFormat = {
            A: [],
            B: [],
            C: [],
            D: [],
            E: [],
            F: [],
            G: [],
            H: [],
            I: [],
            J: [],
            K: [],
            L: [],
            M: [],
            N: [],
            O: [],
            P: [],
            Q: [],
            R: [],
            S: [],
            T: [],
            U: [],
            V: [],
            W: [],
            X: [],
            Y: [],
            Z: [],
        }

        data.map((item, index) => {
            if (Dimensions.get('screen').width >= 600 && Dimensions.get('screen').height >= 600) {
                if (index == 0) {
                    this.setState({ name: item.name })

                }
            }
            let charctr = item.name[0].toUpperCase()
            listFormat[charctr] = [...listFormat[charctr], item]
        })
        this.setState({ sorted: listFormat })

    }
    //List Section Item Component
    renderItem = ({ item }) => {
        const { navigation } = this.props;
        let FontSize = 16;
        let textPadding = 10;
        if (Dimensions.get('screen').width >= 600 && Dimensions.get('screen').height >= 600) {
            FontSize = 18;
            textPadding = 10;
        }
        let listItemStyle = StyleSheet.create({
            p: {
                color: '#ffffff',
                fontSize: FontSize
            }
        })
        let firstChar = item.name[0].toUpperCase();
        let lenghtArr = this.state.sorted[firstChar].length;
        let lastValue = this.state.sorted[firstChar][lenghtArr - 1].name;
        return (
            <TouchableOpacity
                onPress={() => {
                    if (Dimensions.get('screen').width >= 600 && Dimensions.get('screen').height >= 600) {
                        this.setState({ name: item.name })
                    } else {
                        navigation.navigate('ProductList', { type: 'appSol', value: item.name, mainTitle: "Product by Application" })
                    }
                }}
            >
                <View style={{
                    marginHorizontal: 20,
                    padding: textPadding,
                    borderBottomColor: '#ffffff',
                    borderBottomWidth: item.name !== lastValue ? 1 : 0,
                    backgroundColor: item.name == this.state.name ? 'rgba(4, 4, 4,0.302)' : 'transparent'
                }}>

                    <HTMLView value={`<p>${decodeHtml(item.name)}</p>`} stylesheet={listItemStyle} />
                </View>
            </TouchableOpacity>
        )
    }
    //List Section Header Component
    renderSectionHeader = ({ section: { title } }) => {
        let FontSize = 16;
        if (Dimensions.get('screen').width >= 600 && Dimensions.get('screen').height >= 600) {
            FontSize = 20;
        }
        return (
            <>
                {
                    this.state.sorted[title].length > 0 ?
                        < View style={{
                            paddingLeft: 10,
                            backgroundColor: 'rgba(4, 4, 4,0.302)',
                            paddingVertical: 5,
                            marginHorizontal: 20,
                            marginVertical: 10,
                            // opacity: 0.302
                        }}>
                            <Text style={{
                                color: '#ffffff',
                                fontSize: FontSize,
                                fontWeight: "700"
                            }}>{title}</Text>
                        </View>
                        : <></>
                }
            </>
        )
    }





    render() {


        return (
            <ScreenBackground>
                <Header {...this.props} screenTitle="Product by Application" showBackBtn={false} />

                {
                    (Dimensions.get('screen').width >= 600 && Dimensions.get('screen').height >= 600)
                        ?
                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            flexWrap: "wrap"
                        }}>
                            <View style={{
                                flex: 1,
                                marginHorizontal: 20,
                                alignSelf: "flex-start"
                            }}>
                                {/* <AlphabetSectionList

                                    //Used AlphabetSectionList Library for alphabetic scroll
                                    data={this.state.sorted} //pass the sorted data
                                    renderItem={this.renderItem} // pass the item component
                                    // custom section header
                                    renderSectionHeader={this.renderSectionHeader} // pass the header component

                                /> */}
                            </View>
                            <View style={{
                                flex: 1,
                                paddingRight: 15
                            }}>
                                <ProductList {...this.props} key={this.state.name} header={false} route={{ params: { type: 'appSol', value: this.state.name, mainTitle: "Product by Application" } }} />
                            </View>
                        </View>
                        :

                        <AlphabetSectionList

                            //Used AlphabetSectionList Library for alphabetic scroll

                            data={this.state.sorted} //pass the sorted data
                            renderItem={this.renderItem} // pass the item component
                            // custom section header
                            renderSectionHeader={this.renderSectionHeader} // pass the header component

                        />

                }



            </ScreenBackground>
        )
    }
}
