/**
 * Copyright (c) 2020
 *
 * Product Listing Screen
 * fetch the product by the Context API
 *
 * @summary Product listing
 * @author Tajjamul <tajjamul.zaman@nxb.com.pk>
 *
 * Created at     : 2020-09-20 12:30:10 
 * Last modified  : 2020-10-02 11:51:40
 */

import React, { Component, createRef } from 'react';
import {
    ScrollView,
    View
} from "react-native";
import ScreenBackground from '../Components/ScreenBackground';
import Header from '../Components/Header';
import { ProductContextData } from '../Components/ProductContext';
import ProductCard from '../Components/ProductCard';

export default class ProductList extends Component {

    static contextType = ProductContextData;


    constructor(props) {
        super(props);
        this.state = {
            cat: ''
        }
        this.scrollRef = createRef();

    }

    componentDidMount() {

        //Scroll to the top on focusing on the component

        const { navigation } = this.props

        navigation.addListener('focus', () => {
            this.scrollRef.current?.scrollTo({
                y: 0,
                x: 0,
                animated: true,
            });

        })

    }

    screenContetnt() {
        const { type, value } = this.props.route.params

        //Get the Products from Context API

        const { products } = this.context;
        /*
        * appSol => Application Solution / Market Solution
        * category => Find a product List
        * search => Searched Product List
        */

        return (

            <ScrollView
                ref={this.scrollRef}
                style={{
                    flex: 1, marginVertical: 10,
                }}
                contentContainerStyle={{
                    justifyContent: "center",
                    paddingHorizontal: 10
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "flex-start"
                    }}
                >

                    {
                        products.map((item, index) => {
                            let desc = '';
                            if (item["Description"] !== undefined) {
                                desc = item["Description"]
                            }
                            if (type == 'appSol') {
                                if (item["Market Applications"] != undefined && item["Market Applications"].indexOf(value) > -1) {
                                    return (
                                        <ProductCard  {...this.props} key={index} singleRow={true} item={item} />
                                    )
                                }
                            } else if (type == 'category') {
                                if (item["Categories"] != undefined && item["Categories"].indexOf(value) > -1) {
                                    return (
                                        <ProductCard {...this.props} key={index} singleRow={true} item={item} />
                                    )
                                }
                            } else if (type == "search" && value !== undefined) {

                                if (
                                    value != ''
                                    && value != ' '
                                    && item["Name"] != undefined
                                    && (item["Name"].toLowerCase().indexOf(value.toLowerCase()) > -1
                                        || desc.toLowerCase().indexOf(value.toLowerCase()) > -1
                                    )

                                ) {
                                    return (

                                        <ProductCard {...this.props} key={index} item={item} />
                                    )
                                } else {
                                    return (
                                        <React.Fragment key={index}>

                                        </React.Fragment>
                                    )
                                }

                            } else {

                            }


                        })
                    }
                </View>
            </ScrollView >
        )
    }


    render() {
        const { mainTitle } = this.props.route.params

        //Render the component conditionally for header and Background Type

        return (
            <>
                {
                    this.props.header == false ?
                        <View style={{ flex: 1, marginVertical: 10 }}>
                            {this.screenContetnt()}
                        </View>
                        :
                        <ScreenBackground>
                            < Header {...this.props} screenTitle={mainTitle} />
                            {this.screenContetnt()}
                        </ScreenBackground>
                }
            </>

        );
    }
}