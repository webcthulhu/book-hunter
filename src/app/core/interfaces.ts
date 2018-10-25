export interface IBook {
  id: string;
  author: string;
  thumbnail: string;
  title: string;
}
export interface IGeolocation {
  accuracy: number;
  location: {
    lat: number;
    lng: number;
  };
}
export interface ILanguage {
  code: string;
  title: string;
}
export interface IPosition {
  id: string;
  latitude: number;
  longitude: number;
  updated: number;
}
export interface IUser {
  id: string;
  avatar?: string;
  language?: string;
  username?: string;
}
