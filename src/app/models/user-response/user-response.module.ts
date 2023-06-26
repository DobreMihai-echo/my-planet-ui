import { User } from "src/app/components/profile/user";

export class UserResponse {
  user: User;
  followedByAuthUser: boolean;
}