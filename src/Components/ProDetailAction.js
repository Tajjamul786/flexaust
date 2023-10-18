/**
 * Copyright (c) 2020
 *
 * This file is used to handle the actions at the bottom of the product detail screen 
 *
 * @summary Product Actions
 * @author Tajjamul <tajjamul.zaman@nxb.com.pk>
 *
 * Created at     : 2020-09-09 16:10:16 
 * Last modified  : 2020-10-02 11:32:56
 */

import React, { Component } from 'react';
import {
    Image,
    View,
    Text,
    StyleSheet,
    Linking,
    Dimensions,
    Platform
} from 'react-native';
import { decodeHtml } from '../Config/CommonFunctions';
import { WEBURL } from '../Config/config';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { addProduct, productById, deleteProduct } from '../Config/DataBase';


export default class ProDetailAction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favorite: false
        }
    }
    componentDidMount() {

        //Check if the product is in favorite

        let { prodID } = this.props
        if (prodID !== "") {
            productById(prodID, "product").then(res => {
                if (res) {
                    this.setState({ ...this.state, favorite: true })
                } else {
                    this.setState({ ...this.state, favorite: false })
                }
            }).catch(err => {
                this.setState({ ...this.state, favorite: false })
            })
        }

    }
    //Map the data
    mapObject(object, callback) {
        return Object.keys(object).map(function (key) {
            return callback(key, object[key]);
        });
    }


    //Open the External Link
    async openLink(url) {
        let supported = await Linking.canOpenURL(url)
        if (supported) {
            await Linking.openURL(url)
        } else {
            alert('Failed to open link')
        }
    }
    //Share product with Email
    async shareItem(item) {
        let { product, prodID } = this.props
        try {

            let url = "mailto:";

            // Create email link query

            let breakCharacter = Platform.OS == 'ios' ? "<br/><br/>" : "%0A%0A";
            let subject = decodeHtml(product.Name).replace(/<[^>]*>/g, '');
            let body = `Sent from Flexaust App ${breakCharacter} ${decodeHtml(product.Name)}  ${decodeHtml(product.Description).replace(/(<([^>]+)>)/ig, '')} ${breakCharacter} More information on this product can be found at: ${WEBURL}`;
            let eql = Platform.OS == 'ios' ? "?p=" : "?p%3D";
            body = body + eql + prodID;
            body = Platform.OS == 'ios' ? body.replace('&', '%26') : body.replace('&amp;', '%26');
            url = url + "?Content-type=text/html&subject=" + subject + "&body=" + body;

            // check if we can use this link
            const canOpen = await Linking.canOpenURL(url);
            if (!canOpen) {
                throw new Error("Could not share link ");
            }
            return Linking.openURL(url);

        } catch (err) {
            alert("Could not Share the product")
        }
    }


    render() {
        let FontSize = 12;
        let iconMarginRight = 10;
        if (Dimensions.get('screen').width >= 600 && Dimensions.get('screen').height >= 600) {
            FontSize = 18;
            iconMarginRight = 15;
        }


        let detStyle = StyleSheet.create({
            actionSheet: {
                backgroundColor: '#efefef',
                marginVertical: 20,
                paddingVertical: 10
            },
            actionBtns: {
                flexDirection: "row",
                padding: 5,
                marginHorizontal: 10,
                borderBottomColor: "#cccccc",
                borderBottomWidth: 1
            },
            actionBtnsNoBorder: {
                flexDirection: "row",
                padding: 5,
                marginHorizontal: 10
            },
            actionIcon: {
                height: 20,
                width: 20,
                alignSelf: "center",
                marginRight: iconMarginRight,
            },
            actionIconQ: {
                height: 22,
                width: 25,
                alignSelf: "center",
                marginRight: iconMarginRight - 5
            }
        })

        let { navigation, product, prodID } = this.props

        return (
            < View style={detStyle.actionSheet} >
                {
                    product["Data Sheet URL"] !== undefined ?
                        <TouchableWithoutFeedback
                            onPress={() => {

                                navigation.navigate('DataSheet', { PageURL: product["Data Sheet URL"] })
                            }}
                            style={detStyle.actionBtns}
                        >
                            <Image source={require('../assets/images/detail/icon-datasheet.png')} style={{ ...detStyle.actionIconQ, width: 18, marginRight: iconMarginRight }} />
                            <Text
                                style={{
                                    fontSize: FontSize,
                                    color: "#666666"
                                }}>View Datasheet</Text>
                        </TouchableWithoutFeedback>

                        : <></>
                }
                < TouchableWithoutFeedback
                    onPress={() => {
                        navigation.navigate('AppLinks', { PageURL: WEBURL + "samples-quotes/quote-request/" })
                        // this.openLink(WEBURL + "samples-quotes/quote-request/")
                    }
                    }
                    style={detStyle.actionBtns}
                >
                    <Image source={require('../assets/images/detail/icon-quote.png')} style={detStyle.actionIconQ} />
                    <Text
                        style={{
                            fontSize: FontSize,
                            color: "#666666"
                        }}>Request a Quote</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress={() => {
                        if (this.state.favorite === false) {
                            if (prodID !== "") {
                                addProduct(prodID, "product", JSON.stringify(product)).then(() => {
                                    this.setState({ ...this.state, favorite: true })
                                }).catch(err => {
                                    alert('Failed to add please try again')
                                })
                            }
                        } else {
                            if (prodID !== "") {
                                deleteProduct(prodID, "product").then(() => {
                                    this.setState({ ...this.state, favorite: false })
                                }).catch(err => {
                                    alert('Failed to remove please try again')
                                })
                            }
                        }
                    }}

                    style={detStyle.actionBtns}
                >
                    <Image source={require('../assets/images/detail/icon-favorites-gray.png')} style={detStyle.actionIcon} />
                    <Text
                        style={{
                            fontSize: FontSize,
                            color: "#666666"
                        }}>
                        {
                            this.state.favorite == true ?
                                "Remove from Favorites"
                                :
                                "Add to Favorites"
                        }
                    </Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress={() => {
                        this.shareItem()
                    }}
                    style={detStyle.actionBtnsNoBorder}
                >
                    <Image source={require('../assets/images/detail/icon-share.png')} style={detStyle.actionIcon} />
                    <Text
                        style={{
                            fontSize: FontSize,
                            color: "#666666"
                        }}>Share</Text>
                </TouchableWithoutFeedback>
            </View >

        )
    }
}