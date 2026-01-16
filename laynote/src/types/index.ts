export interface User {
  userId: string;
  userEmail: string;
  password: string;
  confirmPassword: string
  userName: string;
  nickName: string;
  userPhone: string;
  profileImageUrl: string;
  snsId: string | null;
  joinPath: string;
}
