interface CBase {
  _id: string;
  type: "event" | "car" | "stay";
}

export interface CEvent extends CBase {
  type: "event";
  address: string;
  createdAt: string;
  description: string;
  endTime: string;
  eventDate: string;
  forever: boolean;
  name: string;
  pictures: Array<string>;
  price: number;
  startTime: string;
  state: string;
  updatedAt: string;
}

export interface CCar extends CBase {
  type: "car";
  description: string;
  name: string;
  picture: string;
  prix: 42000;
  brand: {
    _id: string;
    name: string;
    description: string;
    picture: string;
  };
}

export interface CStay extends CBase {
  type: "stay";
  media: {
    videos: Array<string>;
    pictures: Array<string>;
  };
  name: string;
  description: string;
  state: string;
  city: string;
  adress: string;
  isHotel: boolean;
  amenities: [
    {
      name: string;
      description: string;
      _id: string;
    }
  ];
  totalRating: number;
  averageRating: number;
  rules: [];
  rooms: [
    {
      beds: Array<string>;
      _id: string;
    }
  ];
  reviews: [];
  availability: [
    {
      _id: string;
      startDate: string;
      endDate: string;
    }
  ];
  user: {
    userType: boolean;
    newEmail: string;
    gender: string;
    verifed: boolean;
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;

    avatar: string;
    about: string;
    dateOfBirth: string;
    phoneNumber: string;
    adress: string;
  };
  propertyType: {
    name: string;
    _id: string;
  };
  bedsCount: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export type CometripData = CEvent | CCar | CStay;
