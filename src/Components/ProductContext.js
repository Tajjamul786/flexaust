/**
 * Copyright (c) 2020
 *
 * This file is used to manage all the listing of the products throughout the application 
 * this is an important file for products operations
 * this is basic file of the application 
 *
 * @summary Product Context API
 * @author Tajjamul <tajzuman786@gmail.com>
 *
 */

import React, { createContext, Component } from 'react';
import { APIURL } from '../Config/config';
import axios from 'axios';

export const ProductContextData = createContext();

export default class ProductContext extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    componentDidMount() {

        //get all the products from flexaust.com

        axios.get(APIURL + '?data=products')
            .then(res => {
                this.setState({ products: res.data.products })
            }).catch(err => {
                // alert('Products did not load')
            })
    }

    render() {
        return (
            <ProductContextData.Provider value={this.state}>
                {this.props.children}
            </ProductContextData.Provider>
        )
    }

}
