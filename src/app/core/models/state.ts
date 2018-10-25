export class State {
  avatar: string;
  books: any[];
  email: string;
  id: string;
  language: string;
  logged: boolean;
  messages: any[];
  position: {
    latitude: number;
    longitude: number;
    updated: number;
  };
  title: string;
  username: string;
  constructor(options) {
    this.avatar = options.avatar || '000-anonymous.png';
    this.books = options.books || [];
    this.email = options.email || null;
    this.id = options.id || null;
    this.language = options.language || 'en';
    this.logged = options.logged || false;
    this.messages = options.messages || [];
    this.position = options.position || {
      latitude: null,
      longitude: null,
      updated: null
    };
    this.title = options.title || 'Sign In';
    this.username = options.username || null;
  }
}

// interface State {
//   avatar: string;
//   books: any[];
//   email: string;
//   id: string;
//   logged: boolean;
//   messages: any[];
//   position: {
//     latitude: number;
//     longitude: number;
//     updated: number;
//   };
//   title: string;
//   username: string;
// }
