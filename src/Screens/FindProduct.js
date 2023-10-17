/**
 * Copyright (c) 2020
 *
 * Find Products Screen
 * Shows the data category wise
 *
 * @summary Find Products Screen
 * @author Tajjamul <tajjamul.zaman@nxb.com.pk>
 *
 * Created at     : 2020-09-18 20:20:26 
 * Last modified  : 2020-10-02 11:50:20
 */


import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import ScreenBacground from '../Components/ScreenBackground';
import Header from '../Components/Header';
import Accordian from '../Components/shared/accordian';
import HTMLView from 'react-native-htmlview';
import { APIURL } from '../Config/config';
import axios from 'axios';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import ProductList from './ProductList';

export default class FindProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            cat: ''
        }
    }

    componentDidMount() {
        // Request Categories from flexaust.com
        axios.get(APIURL + "?data=categories")
            .then(res => {
                this.setState({ categories: res.data.categories })
                if (Dimensions.get('screen').width >= 600 && Dimensions.get('screen').height >= 600) {
                    if (res.data.categories[0] !== undefined
                        && res.data.categories[0]["subcategories"] !== undefined
                        && res.data.categories[0]["subcategories"][0] !== undefined
                        && res.data.categories[0]["subcategories"][0]["name"] !== undefined) {
                        this.setState({ cat: res.data.categories[0]["subcategories"][0]["name"] })
                    }
                }
            }).catch(err => {
                alert('Categories did not load')
            })
    }

    //Accordian list head component

    _head(item) {

        let FontSize = 18;
        if (Dimensions.get('screen').width >= 600 && Dimensions.get('screen').height >= 600) {
            FontSize = 22
        }
        const style = StyleSheet.create({
            p: {
                color: '#ffffff',
                fontSize: FontSize
            }
        })

        return (
            <View
                style={{
                    borderBottomColor: '#ffffff',
                    paddingVertical: 10,
                    borderBottomWidth: 1
                }}
            >
                <HTMLView
                    value={`<p>${item.name}</p>`}
                    stylesheet={style}
                />
            </View>
        );
    }

    //Accordian list body component

    _body = item => {

        let FontSize = 16;
        if (Dimensions.get('screen').width >= 600 && Dimensions.get('screen').height >= 600) {
            FontSize = 20
        }

        const style = StyleSheet.create({
            p: {
                color: '#ffffff',
                fontSize: FontSize
            }
        })
        const { navigation } = this.props
        return (

            <>
                {
                    item.subcategories.map((subcat, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    if (Dimensions.get('screen').width >= 600 && Dimensions.get('screen').height >= 600) {
                                        this.setState({ cat: subcat.name })
                                    } else {
                                        navigation.navigate('ProductList', { type: 'category', value: subcat.name, mainTitle: "Find a Product" })
                                    }
                                }}
                                key={index}
                            >
                                <View style={{
                                    borderBottomColor: '#ffffff',
                                    paddingVertical: 10,
                                    paddingLeft: 5,
                                    borderBottomWidth: 1,
                                    marginLeft: 20,
                                    backgroundColor: subcat.name == this.state.cat ? 'rgba(4, 4, 4,0.302)' : 'transparent'
                                }}

                                >
                                    <HTMLView
                                        value={`<p>${subcat.name}</p>`}
                                        stylesheet={style}
                                    />

                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </>

        );
    }

    render() {
        return (
            <ScreenBacground>
                <Header {...this.props} screenTitle="Find a Product" showBackBtn={false} />
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
                                <Accordian
                                    list={this.state.categories} // Pass the data
                                    header={this._head} // Pass the header component
                                    body={this._body} //Pass the body component
                                    expandedIndex={0} //Default open first accordion
                                />
                            </View>
                            <View style={{
                                flex: 1,
                                paddingRight: 15
                            }}>
                                <ProductList {...this.props} key={this.state.cat} header={false} route={{ params: { type: 'category', value: this.state.cat, mainTitle: "Find a Product" } }} />
                            </View>
                        </View>
                        :
                        <View style={{ marginHorizontal: 20 }}>
                            <Accordian
                                list={this.state.categories} // Pass the data
                                header={this._head} // Pass the header component
                                body={this._body} //Pass the body component
                                expandedIndex={0} //Default open first accordion
                            />
                        </View>
                }

            </ScreenBacground>
        )
    }
}