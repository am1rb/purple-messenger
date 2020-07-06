export interface ProfileInfo {
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
}

export enum AccountStatus {
  Offline = 0,
  Online,
}

export interface FriendProfileInfo extends ProfileInfo {
  status: AccountStatus;
}
