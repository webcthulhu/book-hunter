import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';
import { google } from 'googleapis';

admin.initializeApp(functions.config().firebase);
const corsHandler = cors({origin: true});
google.options({ auth: 'AIzaSyDPtlXKRFhhFJRQVwVbzrTeRTAzbp4wvS4' });
const books = google.books('v1');

export const createQueue = functions.https.onRequest((request, response) => {
  corsHandler(request, response, async () => {
    const id = request.query.uid;
    if (!id) { response.status(500).json({ message: "No ID provided" }); }
    try {
      const r = 10; /* hardcoded radius of almost immediate vicinity */
      const expiration = 3 * 24 * 60 * 60 * 1000; /* 259200000  (3 days im milliseconds) */
      const outdated = Date.now() - expiration;
      const positions = [];
      const youSnapshot = await admin.firestore().doc('positions/' + id).get();
      const you = youSnapshot.data();
      const positionsSnapshot = await admin.firestore().collection('positions').where('updated', '>', outdated).get();
      positionsSnapshot.forEach(d => { positions.push(d.data()) });
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
  });
});

export const dismissBookFromQueue = functions.https.onRequest((request, response) => {
  corsHandler(request, response, () => {
    console.log(request.query);
    // const user = request.query.uid;
    // const book = request.query.bid;
    // add book to undesirable
  });
});

export const keepBookFromQueue = functions.https.onRequest((request, response) => {
  corsHandler(request, response, () => {
    console.log(request.query);
    // const user = request.query.uid;
    // const book = request.query.bid;
    // add book to desirable
  });
});

export const searchBooks = functions.https.onRequest((request, response) => {
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

export const createUserInDatabase = functions.auth.user().onCreate((user) => {
  return admin.firestore().collection('users').doc(user.uid).set({
    id: user.uid,
    email: user.email
  });
});

export const removeUserFromDatabase = functions.auth.user().onDelete((user) => {
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
    result.forEach(doc => { data.push(doc.data()) });
    return data;
  });
}

// function getBooksQuery(ids) {}
