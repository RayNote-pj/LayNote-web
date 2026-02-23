export const MAIN_APT_PATH = "http://localhost:4040/api/v1"

export const AUTH_PATH = "/auth";
export const USER_PATH = "/user";
export const NOTE_PROJECT_PATH = "/note-projects";
export const NOTE_PROJECT_USER_PATH = "/note-project-users";
export const NOTE_PROJECT_JOIN_PATH = "/note-project-joins";
export const NOTE_PROJECT_COMPOSITION_PATH = "/note-project-compositions";
export const NOTE_BOX_PATH = "/note-box";
export const NOTE_IMAGE_BOX_PATH = "/note-image-boxes";
export const NOTE_IMAGE_BOX_LIST_PATH = "/note-image-box-list";
export const NOTE_LIST_PATH = "/note-list";
export const NOTE_LIST_ITEM_PATH = "/note-list-items";
export const NOTE_PROJECT_PIN = "/note-project-pins"

//Image
export const IMG_PATH = "http://localhost:4040/image";

// auth
export const SIGN_UP = "/sign-up";
export const LOGIN = "/login";
export const DUPLICATE = "/duplication";

// user
export const USER_INFO = "/my-page";
export const USER_UPDATE = "/account-update";
export const USER_DELETE = "/account-delete";

// noteProject
export const NOTE_PROJECT_ALL = "/all";
export const NOTE_PROJECT_CREATE = "/create";
export const NOTE_PROJECT_UPDATE_TITLE = "/update/title";
export const NOTE_PROJECT_UPDATE_IMAGE = "/update/image";
export const NOTE_PROJECT_DELETE = "/delete";
export const NOTE_PROJECT_TRASH = "/waste-basket";
export const NOTE_PROJECT_DELETE_DATE = "/deleteAt";
export const NOTE_PROJECT_COMPLETE_DELETE = "/complete-delete";

//noteProjectComposition
export const COMPOSITION_GET = "/all";
export const COMPOSITION_SIZE_PUT = "/size";
export const COMPOSITION_POSITION_PUT = "/position";

//notBox 
export const NOTE_BOX_POST = "/create";
export const NOTE_BOX_PUT = "/update";
export const NOTE_BOX_PUT_IMG = "/update-img";
export const NOTE_BOX_DELETE = "/delete";

//noteList
export const NOTE_LIST_CREATE = "/create";
export const NOTE_LIST_DELETE = "/delete";
export const NOTE_LIST_UPDATE = "/update";

//noteImageBox
export const NOTE_IMG_BOX_CREATE = "/create";
export const NOTE_IMG_BOX_IMG = "/update-img";
export const NOTE_IMG_BOX_CAPTION = "/update-caption";
export const NOTE_IMG_BOX_DELETE = "/delete";

//noteImageBoxList
export const NOTE_IMAGE_BOX_LIST_DELETE = "/delete";

//noteListItem
export const NOTE_LIST_ITEM_CREATE ="/create";
export const NOTE_LIST_ITEM_UPDATE ="/update";
export const NOTE_LIST_ITEM_DELTE ="/delete";
export const NOTE_LIST_ITEM_CHECK = "/check";

//noteProjectPin
export const NOTE_PROJECT_PIN_GET = "/all";
export const NOTE_PROJECT_PIN_POST = "/create";
export const NOTE_PROJECT_PIN_DELETE = "/delete";

//projectUser
export const NOTE_PROJECT_USER_GET = "/user-list";
export const NOTE_PROJECT_USER_PUT = "/authority-change";
export const NOTE_PROJECT_USER_CHECK_MEMBER = "/check-member";

//join
export const NOTE_PROJECT_JOIN_POST = "/project-apply";
export const NOTE_PROJECT_JOIN_PUT = "/apply-state-change";