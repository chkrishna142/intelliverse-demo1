import Cookies from 'js-cookie';
import {
  LOGIN_ACTION_FAILURE,
  LOGIN_ACTION_LOADING,
  LOGIN_ACTION_STATUS_RESET,
  LOGIN_ACTION_SUCCESS,
  LOGOUT_ACTION_LOADING,
  LOGOUT_ACTION_SUCCESS,
  SET_PLANT_NAME,
} from './auth.types';
import { AES, enc } from 'crypto-js';

let current_user_cookie_bytes;
let current_user_decrypted_data = {};

const cookie_instance = Cookies.withAttributes({ secure: true });
try {
  current_user_cookie_bytes = AES.decrypt(
    cookie_instance.get('current_user') || '',
    'ultratech'
  );
  current_user_decrypted_data = JSON.parse(
    current_user_cookie_bytes.toString(enc.Utf8) || '{}'
  );
  // console.log({ current_user_decrypted_data });
} catch (error) {
  console.log({ error });
  cookie_instance.remove('current_user');
  cookie_instance.remove('isAuth');
  cookie_instance.remove('token');
}
console.log(
  'Current user cookie',
  current_user_decrypted_data,
  cookie_instance
);

const initial_current_user =
  Object.keys(current_user_decrypted_data).length > 0
    ? current_user_decrypted_data
    : {
        email: '',
        access_token: '',
        user_type: '',
        default_plant: '',
      };

console.log(
  'Initial state user',
  initial_current_user,
  current_user_decrypted_data
);

console.log(
  {
    isAuth: JSON.parse(Cookies.get('isAuth') || 'false'),
    init: initial_current_user?.access_token,
  },
  'User'
);

const isAuth =
  JSON.parse(Cookies.get('isAuth') || 'false') &&
  initial_current_user?.access_token
    ? true
    : false;

const init_auth_state = {
  isAuth,
  states: {
    loading: false,
    success: false,
    failure: false,
    error_message: '',
  },
  current_user: {
    ...initial_current_user,
  },
  all_users: [],
};

export const auth_reducer = (state = init_auth_state, action) => {
  const { type, payload } = action;
  console.log('Login action', action, state);
  switch (type) {
    case LOGIN_ACTION_LOADING:
      // Handle LOGIN_ACTION_LOADING
      return {
        ...state,
        states: {
          ...state.states,
          loading: true,
          success: false,
          failure: false,
          error_message: '',
        },
      };
    case LOGIN_ACTION_SUCCESS:
      // Handle LOGIN_ACTION_SUCCESS
      if (payload && typeof payload !== 'string') {
        const data = payload;
        return {
          ...state,
          current_user: {
            ...data,
            user: {
              ...data.user,
            },
          },
          isAuth: true,
          states: {
            success: true,
            loading: false,
            error_message: '',
            failure: false,
          },
        };
      }
      return state;
    case LOGIN_ACTION_FAILURE:
      // Handle LOGIN_ACTION_FAILURE
      if (payload && typeof payload === 'string') {
        const error = payload;
        console.log('ERROR', error);
        return {
          ...state,
          isAuth: false,
          states: {
            failure: true,
            error_message: error,
            success: false,
            loading: false,
          },
        };
      }
      return state;
    case LOGIN_ACTION_STATUS_RESET:
      return {
        ...state,
        states: {
          ...state.states,
          loading: false,
          success: false,
          error_message: '',
          failure: false,
        },
      };
    default: {
      return {
        ...state,
      };
    }
  }
};
