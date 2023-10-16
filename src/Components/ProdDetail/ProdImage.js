/**
 * Copyright (c) 2020
 *
 * This files is used by the Product detail screen to show the product Image
 *
 * @summary Product Image
 * @author Tajjamul <tajjamul.zaman@nxb.com.pk>
 *
 * Created at     : 2020-09-04 13:21:50 
 * Last modified  : 2020-10-02 12:22:26
 */

import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Linking, Dimensions
} from 'react-native';
// import FastImage from 'react-native-fast-image'


export default class ProdImage extends Component {


    //Open the External Links

    async openLink(url) {
        let supported = await Linking.canOpenURL(url)
        if (supported) {
            await Linking.openURL(url)
        } else {
            alert('Failed to open link')
        }
    }


    render() {

        let iconsHeight = 15;
        let iconsHeightShip = 12;
        let AddiconsHeight = 15;
        if (Dimensions.get('screen').width >= 600 && Dimensions.get('screen').height >= 600) {
            iconsHeight = 30;
            iconsHeightShip = 30;
            AddiconsHeight = 25;
        }
        let detStyle = StyleSheet.create({
            image: {
                width: '100%',
                height: undefined,
                aspectRatio: 1,
                marginVertical: 10
            },
            imageAdd: {
                borderColor: "#e2e2e2",
                borderWidth: 1,
                height: AddiconsHeight,
                width: AddiconsHeight,
                justifyContent: "center",
                textAlign: "center",
                alignItems: 'center',
                position: "absolute",
                bottom: 10,
                left: 0,
                zIndex: 999
            },

            mataIcon: {
                height: iconsHeight,
                width: iconsHeight,
                marginRight: 3
            },
            mataIconShip: {
                height: iconsHeightShip,
                width: undefined,
                aspectRatio: 2.33,
                alignSelf: "center"
            },

        })




        const { imageURL, productMeta } = this.props



        return (
            <>
                <View>
                    {/* <FastImage
                        style={detStyle.image}
                        source={{ uri: imageURL }} /> */}
                    <TouchableOpacity
                        onPress={() => {
                            if (imageURL !== undefined) {
                                this.openLink(imageURL)
                            }
                        }}
                        style={detStyle.imageAdd}>
                        {/* <FastImage
                            style={{
                                height: 15,
                                width: 15
                            }}
                            source={require("../../assets/images/icon-plus.png")} /> */}
                    </TouchableOpacity>
                </View>

                <View style={{
                    flexDirection: "row",
                    marginVertical: 10,
                    justifyContent: "space-between"
                }}>
                    {
                        (productMeta !== undefined
                            && productMeta["Applications"] !== undefined
                            && productMeta["Applications"].indexOf('air') > -1) 
                            // ?
                            // <FastImage source={require('../../assets/images/detail/icon-use-A-on.png')} style={detStyle.mataIcon} />
                            // :
                            // <FastImage source={require('../../assets/images/detail/icon-use-A-off.png')} style={detStyle.mataIcon} />
                    }
                    {
                        (productMeta !== undefined
                            && productMeta["Applications"] !== undefined
                            && productMeta["Applications"].indexOf('dust') > -1) 
                            // ?
                            // <FastImage source={require('../../assets/images/detail/icon-use-D-on.png')} style={detStyle.mataIcon} />
                            // :
                            // <FastImage source={require('../../assets/images/detail/icon-use-D-off.png')} style={detStyle.mataIcon} />
                    }
                    {
                        (productMeta !== undefined
                            && productMeta["Applications"] !== undefined
                            && productMeta["Applications"].indexOf('fume') > -1) 
                            // ?
                            // <FastImage source={require('../../assets/images/detail/icon-use-F-on.png')} style={detStyle.mataIcon} />
                            // :
                            // <FastImage source={require('../../assets/images/detail/icon-use-F-off.png')} style={detStyle.mataIcon} />
                    }
                    {
                        (productMeta !== undefined
                            && productMeta["Applications"] !== undefined
                            && productMeta["Applications"].indexOf('material') > -1) 
                            // ?
                            // <FastImage source={require('../../assets/images/detail/icon-use-M-on.png')} style={detStyle.mataIcon} />
                            // :
                            // <FastImage source={require('../../assets/images/detail/icon-use-M-off.png')} style={detStyle.mataIcon} />
                    }
                    {
                        (productMeta !== undefined
                            && productMeta["Flame Retardant"] !== undefined
                            && productMeta["Flame Retardant"] == "true")
                            //  ?
                            // <FastImage source={require('../../assets/images/detail/icon-use-RL-on.png')} style={detStyle.mataIcon} />
                            // :
                            // <FastImage source={require('../../assets/images/detail/icon-use-RL-off.png')} style={detStyle.mataIcon} />
                    }
                    {
                        (productMeta !== undefined
                            && productMeta["24 Hour Shipping"] !== undefined
                            && productMeta["24 Hour Shipping"] == "true")
                            // ?
                            // <FastImage source={require('../../assets/images/detail/icon-use-ship-on.png')} style={detStyle.mataIconShip} />
                            // :
                            // <FastImage source={require('../../assets/images/detail/icon-use-ship-off.png')} style={detStyle.mataIconShip} />
                    }
                </View>

            </>
        )
    }

}