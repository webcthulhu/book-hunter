"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors");
const googleapis_1 = require("googleapis");
admin.initializeApp(functions.config().firebase);
const corsHandler = cors({ origin: true });
googleapis_1.google.options({ auth: 'AIzaSyDPtlXKRFhhFJRQVwVbzrTeRTAzbp4wvS4' });
const books = googleapis_1.google.books('v1');
exports.createQueue = functions.https.onRequest((request, response) => {
    corsHandler(request, response, () => __awaiter(this, void 0, void 0, function* () {
        const id = request.query.uid;
        if (!id) {
            response.status(500).json({ message: "No ID provided" });
        }
        try {
            const r = 10; /* hardcoded radius of almost immediate vicinity */
            const expiration = 3 * 24 * 60 * 60 * 1000; /* 259200000  (3 days im milliseconds) */
            const outdated = Date.now() - expiration;
            const positions = [];
            const youSnapshot = yield admin.firestore().doc('positions/' + id).get();
            const you = youSnapshot.data();
            const positionsSnapshot = yield admin.firestore().collection('positions').where('updated', '>', outdated).get();
            positionsSnapshot.forEach(d => { positions.push(d.data()); });
            const inVicinity = positions
                .filter(p => p.latitude >= you.latitude - r && p.latitude <= you.latitude + r && p.longitude >= you.longitude - r && p.longitude <= you.longitude + r);
            // TODO: from inVicinity users get books
            response.status(200).json({ message: 'OK' });
        }
        catch (error) {
            response.status(500).json({ message: 'Can\'t create queue' });
        }
        // getUserPosition(id)
        //   .then(userPosition => {
        //     you = userPosition;
        //     return getPositions()
        //   })
        //   .then(positions => {
        //     const r = 1;
        //     const inVicinity = positions
        //       .filter(pos => pos.latitude >= you.latitude - r && pos.latitude <= you.latitude + r && pos.longitude >= you.longitude - r && pos.longitude <= you.longitude + r);
        //     // TODO: from inVicinity users get books
        //     response.status(200).json({ message: 'OK' });
        //   })
        //   .catch(err => {
        //     response.status(500).json({ message: 'Can\'t create queue' });
        //   });
    }));
});
exports.dismissBookFromQueue = functions.https.onRequest((request, response) => {
    corsHandler(request, response, () => {
        console.log(request.query);
        // const user = request.query.uid;
        // const book = request.query.bid;
        // add book to undesirable
    });
});
exports.keepBookFromQueue = functions.https.onRequest((request, response) => {
    corsHandler(request, response, () => {
        console.log(request.query);
        // const user = request.query.uid;
        // const book = request.query.bid;
        // add book to desirable
    });
});
exports.searchBooks = functions.https.onRequest((request, response) => {
    corsHandler(request, response, () => {
        const q = request.query.q;
        books.volumes.list({
            q: q,
            projection: 'lite'
        }).then(result => {
            response.status(200).json(result.data);
            return result.data;
        }).catch((err) => {
            console.error("Error ", err);
            response.status(500).send(err);
        });
    });
});
exports.createUserInDatabase = functions.auth.user().onCreate((user) => {
    return admin.firestore().collection('users').doc(user.uid).set({
        id: user.uid,
        email: user.email
    });
});
exports.removeUserFromDatabase = functions.auth.user().onDelete((user) => {
    // return Promise.all([
    //   admin.firestore().collection('books').doc(user.uid).remove(),
    //   admin.firestore().collection('positions').doc(user.uid).remove(),
    //   admin.firestore().collection('users').doc(user.uid).remove()
    // ]);
});
function getUserPosition(id) {
    return admin.firestore().collection('positions').doc(id).get().then(result => {
        return result.data();
    });
}
function getPositions() {
    const expiration = 3 * 24 * 60 * 60 * 1000; /* 259200000  (3 days im milliseconds) */
    const outdated = Date.now() - expiration;
    return admin.firestore().collection('positions').where('updated', '>', outdated).get().then(result => {
        const data = [];
        result.forEach(doc => { data.push(doc.data()); });
        return data;
    });
}
// function getBooksQuery(ids) {}
//# sourceMappingURL=index.js.map