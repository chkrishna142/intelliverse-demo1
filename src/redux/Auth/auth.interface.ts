// import { intermediate_states } from "../common.interface"

export interface I_USER_TOKENS {
  auth_token: string;
  refresh_token: string;
};

export type PLANT_NAMES = "Dhar" | "Jaffrabad" | "Bela" | "Tadipatri" | "Reddypalyam" | "ripik" | "none";

export type ENABLED_PLANT_LIST = PLANT_NAMES[]

export interface I_USER_INFO {
  _id: string;
  // name: string;
  email: string;
  // password: string;
  enabled: boolean;
  email_validated: boolean;
  // ipAddress: string;
  role: string;
  client_id_enabled: ENABLED_PLANT_LIST;
  pwdExpired: boolean;
  pwdExpires: string;
  selected_plant: PLANT_NAMES;
}

export interface I_USER_DATA_WITH_USER_INFO_AND_TOKENS {
  data: I_USER_TOKENS,
  user: I_USER_INFO
}

// type AuthPayloadType = I_USER_DATA | null | string

export interface I_AUTH_LOADING_ACTION {
  type: string,
  payload: null
}

export interface I_AUTH_STATUS_RESET {
  type: string,
  payload: null
}

export interface I_AUTH_LOGIN_SUCCESS_ACTION {
  type: string,
  payload: I_USER_DATA_WITH_USER_INFO_AND_TOKENS
}

export interface I_AUTH_LOGIN_FAILURE_ACTION {
  type: string,
  payload: string
}

export interface I_AUTH_LOGOUT_ACTION {
  type: string,
  payload: null
}

export interface I_AUTH_SELECT_PLANT {
  type: string,
  payload: PLANT_NAMES
}


export interface I_AUTH_LOGIN_INPUT {
  email: string,
  password: string,
  username?: string
}

export interface I_AUTH_TOKEN {
  auth_token: string,
  refresh_token: string
}

type intermediate_states = {
  loading: boolean,
  success: boolean,
  failure: boolean,
  error_message: string
}

export interface I_AUTH_REDUCER {
  isAuth: boolean,
  current_user: I_USER_DATA_WITH_USER_INFO_AND_TOKENS,
  states: intermediate_states,
  all_users: I_USER_DATA_WITH_USER_INFO_AND_TOKENS[],
}

export type AUTH_DISPATCH_TYPES =
  | I_AUTH_LOGIN_SUCCESS_ACTION
  | I_AUTH_LOADING_ACTION
  | I_AUTH_STATUS_RESET
  | I_AUTH_LOGIN_FAILURE_ACTION
  | I_AUTH_LOGOUT_ACTION
  | I_AUTH_SELECT_PLANT


export interface AUTH_PROCESS_STATES_SELECTOR {
  auth_error_message: string;
  auth_process_failure: boolean;
  auth_process_loading: boolean;
  auth_process_success: boolean;
}

export interface AUTH_SELECTED_PLANT_SELECTOR {
  selected_plant: PLANT_NAMES
}