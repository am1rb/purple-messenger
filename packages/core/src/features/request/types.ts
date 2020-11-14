import { ProfileInfo } from "@purple-messenger/core/features/profile/types";

export enum RequestStatus {
  Pending,
  Accepted,
  Rejected,
}

export interface Request {
  id: number;
  sentAt: Date;
  sender: ProfileInfo;
  receiver: ProfileInfo;
  markAt: Date;
  status: RequestStatus;
}
