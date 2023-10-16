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

// import SQLite from "react-native-sqlite-storage";

// SQLite.enablePromise(true);

/*
* Database file to store favorite
* It stores the list on local device
* Returns the promise
*/

//Create and find the database

export const createTable = () => {
    // let db;
    // return new Promise((resolve) => {
    //     SQLite.echoTest()
    //         .then(() => {

    //             SQLite.openDatabase({ name: "FavoriteDB", createFromLocation: "~FavoriteDB.sqlite" }).then(DB => {
    //                 db = DB;
    //                 db.executeSql('SELECT * FROM favorite ').then(() => {
    //                 }).catch((error) => {
    //                     db.transaction((tx) => {
    //                         tx.executeSql('CREATE TABLE IF NOT EXISTS favorite(id INTEGER, type VARCHAR(20), item VARCHAR(255))');
    //                     }).then(() => {
    //                     })
    //                 });
    //                 resolve(db);
    //             }).catch(error => {
    //                 alert(error)
    //             })
    //         })

    // });
}

//List all the favorite products stored
export const listProduct = () => {
    // return new Promise((resolve) => {
    //     const products = [];
    //     createTable().then((db) => {
    //         db.transaction((tx) => {
    //             tx.executeSql('SELECT DISTINCT id, type ,item FROM favorite', []).then(([tx, results]) => {
    //                 var len = results.rows.length;
    //                 for (let i = 0; i < len; i++) {
    //                     let row = results.rows.item(i);
    //                     const { id, item, type } = row;
    //                     products.push({
    //                         id,
    //                         item,
    //                         type
    //                     });
    //                 }
    //                 resolve(products);
    //             });
    //         }).then((result) => {
    //             closeDatabase(db);
    //         }).catch(err => {
    //             closeDatabase(db);
    //         })
    //     }).catch(error => {
    //         console.log("echoTest failed - plugin not functional");
    //     });
    // });
}
//Close the Data base
export const closeDatabase = (db) => {
    // if (db) {
    //     db.close()
    //         .then(status => {
    //         }).catch(err => {
    //             console.log("close error")
    //         })

    // } else {
    // }
};


const errorCB = (error) => {
}

//Add the product to favorite

export const addProduct = (id, type, item) => {
    // return new Promise((resolve) => {
    //     createTable().then((db) => {
    //         db.transaction((tx) => {
    //             tx.executeSql('INSERT INTO favorite (id,type,item) VALUES (?, ?, ?)', [id, type, item]).then(([tx, results]) => {
    //                 resolve(results);
    //             }).catch(err => {
    //                 console.log("add error")
    //             })
    //         }).then((result) => {
    //             closeDatabase(db);
    //         }).catch(err => {
    //             closeDatabase(db);
    //         })
    //     })
    // });
}

//Remove from favorite lit

export const deleteProduct = (id, type) => {
    // return new Promise((resolve) => {
    //     createTable().then((db) => {
    //         db.transaction((tx) => {
    //             tx.executeSql('DELETE FROM favorite WHERE id = ? AND type= ? ', [id, type]).then(([tx, results]) => {
    //                 resolve(results);
    //             }).catch(err => {
    //                 console.log("delete error")
    //             })
    //         }).then((result) => {
    //             closeDatabase(db);
    //         }).catch(err => {
    //             closeDatabase(db);
    //         })
    //     })
    // });
}

//Get product by id

export const productById = (id, type) => {
    // return new Promise((resolve, reject) => {
    //     const products = [];
    //     createTable().then((db) => {
    //         db.transaction((tx) => {
    //             tx.executeSql('SELECT * FROM favorite WHERE id = ? AND type= ? ', [id, type]).then(([tx, results]) => {
    //                 var len = results.rows.length;
    //                 for (let i = 0; i < len; i++) {
    //                     let row = results.rows.item(i);
    //                     const { id, item, type } = row;
    //                     products.push({
    //                         id,
    //                         item,
    //                         type
    //                     });
    //                 }
    //                 resolve(products);
    //             }).catch(err => {
    //                 console.log("find error")
    //             })
    //         }).then((result) => {
    //             closeDatabase(db);
    //         }).catch(err => {
    //             closeDatabase(db);
    //         })
    //     })
    // });
}