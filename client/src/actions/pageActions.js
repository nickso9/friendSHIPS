import { LANDING_PAGE, MESSAGE_PAGE, LOGIN_PAGE, REGISTER_PAGE } from '../actions/types';


export const goLogin = () => {
  return {
    type: LOGIN_PAGE
  };
};

export const goLogout = () => {
    return {
      type: LANDING_PAGE
    };
};

export const goRegister = () => {
    return {
      type: REGISTER_PAGE
    };
};

export const goMessage = () => {
    return {
      type: MESSAGE_PAGE
    };
};

