export const get_auth_status = (state) => {
  console.log(state, 'State of Redux');
  const {
    authReducer: {
      isAuth,
      current_user: { access_token, default_plant, email },
    },
  } = state;
  // const plant = '';
  // if (isAuth) {
  //   const {authReducer : { current_}}
  // }
  return { isAuth, access_token, default_plant, email };
};

export const get_auth_process_states = (state) => {
  const {
    authReducer: {
      states: {
        error_message: auth_error_message,
        failure: auth_process_failure,
        loading: auth_process_loading,
        success: auth_process_success,
      },
    },
  } = state;
  return {
    auth_error_message,
    auth_process_failure,
    auth_process_loading,
    auth_process_success,
  };
};

export const get_auth_user_data = (state) => {
  const {
    authReducer: {
      current_user: { user },
    },
  } = state;
  return user;
};

export const get_enabled_client_list = (state) => {
  const {
    authReducer: { current_user },
  } = state;
  if (current_user.user?.client_id_enabled) {
    return current_user.user.client_id_enabled;
  } else return [];
};

export const get_selected_plant_name = (state) => {
  const {
    authReducer: {
      current_user: { user },
    },
  } = state;
  if (user) {
    const { selected_plant } = user;
    return { selected_plant };
  }
  return { selected_plant: null };
};
