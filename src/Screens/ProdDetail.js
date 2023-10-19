/**
 * Copyright (c) 2020
 *
 * Product Detail Screen
 * fetch  the data of the product by the id  in the props
 *
 * @summary Product detail
 * @author Tajjamul <tajzuman786@gmail.com>
 *
 */

import React, { Component, createRef } from 'react';
import {
    ScrollView,
    View,
    StyleSheet,
    Dimensions
} from 'react-native';
import ScreenBackground from '../Components/ScreenBackground';
import Header from '../Components/Header';
import axios from 'axios';
import ProDetailAction from '../Components/ProDetailAction';
import ProdDescription from '../Components/ProdDetail/ProdDescription';
import ProdSpecs from '../Components/ProdDetail/ProdSpecs';
import ProdApplications from '../Components/ProdDetail/ProdApplications';
import ProdFeatures from '../Components/ProdDetail/ProdFeatures';
import ProdImage from '../Components/ProdDetail/ProdImage';
import ProdSummary from '../Components/ProdDetail/ProdSummary';

export default class ProdDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: {},
            productID: "",
        }
        this.scrollRef = createRef();
    }

    componentDidMount() {

        //Change the data on focusing on the component
        const { navigation } = this.props
        navigation.addListener('focus', () => {
            let { detURL } = this.props.route.params

            this.setState({ product: {}, productID: "" })
            //Get the data of the product by using the URL fetched by the component props

            axios.get(detURL)
                .then(res => {
                    this.setState({ product: res.data.product })
                    let temp = detURL.split('&');
                    this.setState({ productID: temp[1].split('=')[1] })
                }).catch(err => {
                    alert('Could not load the deatial')
                })
            //Scroll to the top for every Product

            this.scrollRef.current?.scrollTo({
                y: 0,
                x: 0,
                animated: true,
            });


        });

    }


    render() {

        let detStyle = StyleSheet.create({

            container: {
                flex: 1,
                backgroundColor: '#ffffff'
            },

        })



        let { product } = this.state;

        return (
            <ScreenBackground>
                <Header {...this.props} screenTitle="Product" />
                <View
                    style={detStyle.container}
                >
                    <ScrollView
                        ref={this.scrollRef}
                        style={{
                            paddingHorizontal: 10,
                            backgroundColor: '#fffff'
                        }}

                    >
                        {
                            (Dimensions.get('screen').width >= 600 && Dimensions.get('screen').height >= 600) ?

                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: "row",
                                        flexWrap: "wrap"
                                    }}
                                >
                                    <View style={{
                                        width: Dimensions.get('screen').width * 0.35
                                    }}>

                                        {
                                            this.state.productID !== "" ?
                                                <>
                                                    <ProdImage imageURL={product["Image URL"]} productMeta={product["Product Meta"]} />
                                                    <ProDetailAction
                                                        {...this.props}
                                                        key={this.state.productID}
                                                        prodID={this.state.productID}
                                                        product={product} />
                                                </> : <></>
                                        }
                                        {
                                            product["Market Applications"] !== undefined ?
                                                <ProdApplications product={product} /> : <></>
                                        }
                                    </View>
                                    <View style={{
                                        flex: 1,
                                        padding: 20
                                    }}>
                                        {
                                            this.state.productID !== "" ?
                                                <ProdSummary name={product['Name']} description={product['Description']} />
                                                :
                                                <></>
                                        }
                                        {
                                            product["Specs"] !== undefined ?
                                                <ProdSpecs product={product} productID={this.state.productID} />
                                                :
                                                <></>
                                        }
                                        {
                                            (product["Features"] !== undefined) ?
                                                <ProdFeatures product={product} />
                                                :
                                                <></>
                                        }

                                    </View>

                                </View>
                                :
                                <>
                                    {
                                        this.state.productID !== "" ?
                                            <ProdDescription product={product} productID={this.state.productID} />
                                            : <></>
                                    }

                                    <View>
                                        {
                                            product["Specs"] !== undefined ?
                                                <ProdSpecs product={product} productID={this.state.productID} />
                                                :
                                                <></>
                                        }
                                        {
                                            product["Market Applications"] !== undefined ?
                                                <ProdApplications product={product} /> : <></>
                                        }


                                        {
                                            (product["Features"] !== undefined) ?
                                                <ProdFeatures product={product} />
                                                :
                                                <></>
                                        }

                                    </View>
                                    {
                                        this.state.productID !== "" ?
                                            <ProDetailAction
                                                {...this.props}
                                                key={this.state.productID}
                                                prodID={this.state.productID}
                                                product={product} />
                                            : <></>
                                    }

                                </>

                        }


                    </ScrollView>
                </View>

            </ScreenBackground >
        )
    }
}