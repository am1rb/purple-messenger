export interface Person {
  id: number;
  image: string;
  firstName: string;
  lastName: string;
}

export interface ProfileInfo {
  id: number;
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  bio: string;
}

export enum AccountStatus {
  Offline = 0,
  Online,
}

export interface FriendProfileInfo extends ProfileInfo {
  status: AccountStatus;
}
