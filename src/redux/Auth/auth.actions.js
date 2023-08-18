import {
  LOGIN_ACTION_FAILURE,
  LOGIN_ACTION_LOADING,
  LOGIN_ACTION_STATUS_RESET,
  LOGIN_ACTION_SUCCESS,
  LOGOUT_ACTION_FAILURE,
  LOGOUT_ACTION_LOADING,
  LOGOUT_ACTION_STATUS_RESET,
  LOGOUT_ACTION_SUCCESS,
  SET_PLANT_NAME,
} from './auth.types';
import { Auth_Service } from './auth.services';
import getErrorMessage from '../../util/util';
import Cookies from 'js-cookie';
import { AES, enc } from 'crypto-js';

const login_loading_action = () => ({
  type: LOGIN_ACTION_LOADING,
  payload: null,
});

const login_success_action = (payload) => ({
  type: LOGIN_ACTION_SUCCESS,
  payload,
});

const login_failure_action = (err) => ({
  type: LOGIN_ACTION_FAILURE,
  payload: err,
});

const login_action_status_reset_action = () => ({
  type: LOGIN_ACTION_STATUS_RESET,
  payload: null,
});

export const login_action =
  ({ email, password, user_type, plant }) =>
  async (dispatch) => {
    dispatch(login_loading_action());
    // axios.post()
    try {
      console.log('making a post request for login');
      const login_response = await fetch("https://intelliverse.backend-ripik.com/api/verify", {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          
          "Content-Type": "application/json"
          
        },
        body: JSON.stringify(
          {
            "otp": password
          }
        )
      })
      const data = login_response.data;
      
    await data
      // data.user.selected_plant = "sunpharma_dewas";
      // console.log({ data });
      const expire_in_a_month = new Date(
        new Date().getTime() + 30 * 24 * 60 * 60 * 1000
      );
      console.log(expire_in_a_month, 'Expiration in a month');
      const auth_cookies = Cookies.withAttributes({
        expires: expire_in_a_month,
        secure: true,
      });
      // data.default_plant = plant;

      const stringified_user_data = JSON.stringify({
        //email: data?.email,
        //access_token: data?.access_token,
        user_type: user_type,
        default_plant: user_type === 'Plant Operator' ? plant : '',
      });
      console.log(
        {
          // email: data?.email,
          // access_token: data?.access_token,
          user_type: user_type,
          default_plant: user_type === 'Plant Operator' ? plant : '',
        },
        'Data stored',
        stringified_user_data
      );
      console.log({ user_type, plant }, 'Entered data');
      const encrypted_data = AES.encrypt(stringified_user_data, 'ultratech');
      // console.log(AES.encrypt("", "qc_scheduler"));
      // console.log({ coooook: AES.decrypt(Cookies.get("current_user") || "", "qc_scheduler").toString() });
      // auth_cookies.set("token", data.data.auth_token,);
      auth_cookies.set('current_user', encrypted_data);
      auth_cookies.set('isAuth', true);
      // auth_cookies.set('default_plant', plant);
      console.log('auth cookies: ', auth_cookies);
      dispatch(
        login_success_action({
          
          user_type: user_type,
          default_plant: user_type === 'Plant Operator' ? plant : '',
        })
      );
    } catch (err) {
      // console.log('error while logging in : ', err)
      const error_message = getErrorMessage(err);
      dispatch(login_failure_action(error_message));
    } finally {
      setTimeout(() => {
        dispatch(login_action_status_reset_action());
      }, 1500);
    }
  };

// const logout_action_loading = () => ({
//   type: LOGOUT_ACTION_LOADING,
//   payload: null,
// });

// const logout_action_failure = () => ({
//   type: LOGOUT_ACTION_FAILURE,
//   payload: null,
// });

// const logout_action_success = () => ({
//   type: LOGOUT_ACTION_SUCCESS,
//   payload: null,
// });

// const logout_action_status_reset_action = () => ({
//   type: LOGOUT_ACTION_STATUS_RESET,
//   payload: null,
// });

// export const logout_dispatch = () => (dispatch) => {
//   dispatch(logout_action_loading());
//   try {
//     // localStorage.clear();
//     Cookies.remove('token');
//     Cookies.remove('current_user');
//     Cookies.remove('isAuth');
//     setTimeout(() => {
//       dispatch(logout_action_success());
//     }, 1000);
//   } catch (error) {
//     dispatch(logout_action_failure());
//   } finally {
//     setTimeout(() => {
//       dispatch(logout_action_status_reset_action());
//     }, 1500);
//   }
// };

// const select_plant_action = (selected_plant) => ({
//   type: SET_PLANT_NAME,
//   payload: selected_plant,
// });

// export const select_plant_dispatch = (selected_plant, state) => (dispatch) => {
//   dispatch(select_plant_action(selected_plant));
//   const expire_in_a_month = new Date(
//     new Date().getTime() + 30 * 24 * 60 * 60 * 1000
//   );
//   const cookie_instance = Cookies.withAttributes({
//     expires: expire_in_a_month,
//     secure: true,
//   });
//   const current_user_cookie_bytes = AES.decrypt(
//     cookie_instance.get('current_user') || '',
//     'ultratech'
//   );
//   const current_user_decrypted_data = JSON.parse(
//     current_user_cookie_bytes.toString(enc.Utf8) || '{}'
//   );
//   // const current_user = JSON.parse(Cookies.get("current_user") || "{}");
//   current_user_decrypted_data.user.selected_plant = selected_plant;
//   Cookies.set(
//     'current_user',
//     AES.encrypt(JSON.stringify(current_user_decrypted_data), 'ultratech'),
//     {
//       expires: expire_in_a_month,
//       secure: true,
//     }
//   );
// };
