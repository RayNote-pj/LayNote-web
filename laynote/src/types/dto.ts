export interface LoginRequestdto {
  userEmail: string;
  password: string;
};

export interface SignUpRequestdto {
  userEmail: string;
  password: string;
  confirmPassword: string;
  userName: string;
  nickName: string;
  userPhone: string;
  profileImageUrl?: string;
};

export interface FindIdRequestdto {
  emailAddress: string;
  name: string;
  userPhone: string;
};

export interface FindIdResponsedto {
  userEmail: string;
};

export interface SignUpResponsedto {
  userId: string;
  userEmail: string;
  password: string;
  userName: string;
  nickName: string;
  userPhone: string;
  profileImageUrl: string;
};

export interface LoginResponsedto {
  userId: string;
  userEmail: string;
  nickName: string;
  userName: string;
  userPhone: string;
  profileImageUrl: string;
  token: string;
  exprTime: number;
};

export interface NoteProjectDto {
  noteProjectId: string;
  noteProjectImageUrl: string;
  noteProjectTitle: string;
  createdAt: string;
  updateAt: string;
  deletedAt: string;
}
