import { User, UserRole } from ".";

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
export interface UserUpdatedto {
  userEmail: string;
  nickName: string;
  userName: string;
  userPhone: string;
  profileImageUrl: string;
};

export interface NoteProjectDto {
  noteProjectId: string;
  noteProjectImageUrl: string;
  noteProjectTitle: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  pinId: string;
}
export interface NoteProjectReqestDto {
  noteProjectImageUrl: string;
  noteProjectTitle: string;
}
export interface NoteComposition {
  noteCompositionId: string;
  compositionX: number;
  compositionY: number;
  compositionZ: number;
  compositionZ2: number;
  noteComponentType: NoteComponentType;
  noteBox?: NoteBoxDto;
  noteList?: NoteListDto;
  noteImageBoxList?: NoteImageBoxListDto;
}
export enum NoteComponentType {
  NOTEBOX = "NOTEBOX",
  NOTELIST = "NOTELIST",
  NOTEIMAGEBOX = "NOTEIMAGEBOX",
}
export interface NoteBoxDto {
  noteBoxId: number;
  noteBoxTitle: string;
  noteBoxContent: string;
  imageUrl: string | null;
}
export interface NoteListOneResponseDto {
  noteListId: number;
  noteListTitle: string;
}
export interface NoteImageBoxListDto {
  noteImageBoxListId: number;
  noteImageBoxDto: NoteImageBoxDto[];
}
export interface NoteImageBoxDto {
  noteImageBoxId: number;
  imageCaption: string;
  imageUrl: string;
}
export interface NoteListDto {
  noteListId: number;
  noteListTitle: string;
  noteListItemDto: NoteListItemDto[];
}
export interface NoteListItemDto {
  noteListItemId: number;
  noteListContent: string;
  noteListCheck: boolean;
}

export interface NoteProjectPin {
  pinId: string;
  noteProject: NoteProjectDto;
  user: User;
}

export interface PinDto {
  pinId: string;
  noteProjectId: string;
  noteProjectImageUrl: string | null;
  noteProjectOwnerId: string;
  noteProjectTitle: string;
  createdAt: string;  
  updatedAt: string;
  deletedAt: string | null;
}

export interface NoteBoxUpdateRequestDto {
  noteBoxTitle: string;
  noteBoxContent: string;
} 

export interface NoteProjectMemberDto {
  userEmail: string;
  userRole: UserRole;
  noteProjectId: number;
}

export interface NoteProjectJoin {
  userEmail: string;
  joinStatus: JoinStatus;
}

export type JoinStatus = 'PENDING' | 'APPROVED' | 'REJECTED';