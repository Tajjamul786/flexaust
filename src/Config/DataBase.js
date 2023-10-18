/**
 * Copyright (c) 2020
 *
 * This file is modal file for local storage
 * It uses SQLite
 *
 * @summary Database
 * @author Tajjamul <tajjamul.zaman@nxb.com.pk>
 *
 * Created at     : 2020-09-17 15:11:22 
 * Last modified  : 2020-10-02 11:43:16
 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

//List all the favorite products stored

export const listProduct = async () => {
    try {
        let listItems = await AsyncStorage.getItem('favourite')
        listItems = listItems ? JSON.parse(listItems) : {}
        return listItems
    } catch (err) {
        Alert.alert('Something went wrong. Try again.')
    }
}


//Add the product to favorite

export const addProduct = async (id, type, item) => {
    try {
        let listItems = await AsyncStorage.getItem('favourite')
        listItems = listItems ? JSON.parse(listItems) : {}
        listItems[`${id}-${type}`] = {
            id,
            type,
            item
        }
        await AsyncStorage.setItem('favourite', JSON.stringify(listItems))
        return listItems
    } catch (err) {
        Alert.alert('Something went wrong. Try again.')
    }
}

//Remove from favorite lit

export const deleteProduct = async (id, type) => {
    try {
        let listItems = await AsyncStorage.getItem('favourite')
        listItems = listItems ? JSON.parse(listItems) : {}
        if (listItems[`${id}-${type}`]) {
            delete listItems[`${id}-${type}`]
        }
        await AsyncStorage.setItem('favourite', JSON.stringify(listItems))
        return listItems
    } catch (err) {
        Alert.alert('Something went wrong. Try again.')
    }
}

//Get product by id

export const productById = async (id, type) => {
    try {
        let listItems = await AsyncStorage.getItem('favourite')
        listItems = listItems ? JSON.parse(listItems) : {}
        if (listItems[`${id}-${type}`]) {
            return listItems[`${id}-${type}`]
        }
        return null
    } catch (err) {
        Alert.alert('Something went wrong. Try again.')
    }
}

//Add the product to favorite

export const addRating = async (id, type, rate) => {
    try {
        let listItems = await AsyncStorage.getItem('rating')
        listItems = listItems ? JSON.parse(listItems) : {}
        listItems[`${id}-${type}`] = rate
        await AsyncStorage.setItem('rating', JSON.stringify(listItems))
        return rate
    } catch (err) {
        Alert.alert('Something went wrong. Try again.')
    }
}
//Get rating by id

export const getRateById = async (id, type) => {
    try {
        let listItems = await AsyncStorage.getItem('rating')
        listItems = listItems ? JSON.parse(listItems) : {}
        if (listItems[`${id}-${type}`]) {
            return listItems[`${id}-${type}`]
        }
        return null
    } catch (err) {

    }
}