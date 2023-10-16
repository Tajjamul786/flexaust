/**
 * Copyright (c) 2020
 *
 * This files is used by the Product detail screen on the top section to show Image and Detail Text 
 * This component is used by mobile screen
 *
 * @summary Product Summary and Image on mobile
 * @author Tajjamul <tajjamul.zaman@nxb.com.pk>
 *
 * Created at     : 2020-09-03 03:21:50 
 * Last modified  : 2020-10-02 11:21:56
 */

import React, { Component } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { decodeHtml } from '../../Config/CommonFunctions';
import ProdImage from './ProdImage';
import ProdSummary from './ProdSummary';

export default class ProdDescription extends Component {

    //Format the List with bullets accordingly 


    render() {

        let detStyle = StyleSheet.create({
            imageView: {
                width: '47%',
            }

        })


        const { product } = this.props
        let title = "";
        if (product["Name"] !== undefined) {
            title = decodeHtml(product["Name"]);
        }
        let desc = "";
        if (product["Description"] !== undefined) {
            desc = product["Description"]
        }


        return (
            <View
                style={{
                    flexDirection: "row"
                }
                }
            >
                <View style={detStyle.imageView}>
                    <ProdImage imageURL={product["Image URL"]} productMeta={product["Product Meta"]} />
                </View>

                <View style={{
                    padding: 10,
                    width: "52%",
                }}>
                    <ProdSummary name={title} description={desc} />
                </View>

            </View >
        )
    }

}