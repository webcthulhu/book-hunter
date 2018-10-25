// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    apiKey: 'AIzaSyD7d4ihe5HcyiE6htCKrGKxpef7NwrNsIk',
    authDomain: 'book-samaritan.firebaseapp.com',
    databaseURL: 'https://book-samaritan.firebaseio.com',
    projectId: 'book-samaritan',
    storageBucket: '',
    messagingSenderId: '94537560592'
  },
  languages: [
    { title: 'English', code: 'en' }
  ],
  production: false,
  server: 'http://localhost:5000/book-samaritan/us-central1'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
