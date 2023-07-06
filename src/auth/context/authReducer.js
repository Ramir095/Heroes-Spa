import { types } from '../types/types';
// TERCERO
// En el reducer nunca puede ir localStorage
// El reducer no llama recursos externos!. Se manajen unicamente con el state y la action que recibe
export const authReducer = (state = {}, action) => {

  switch (action.type) {
    case types.login:
      return {
        ...state,
        logged: true,
        user: action.payload
      };
    
    case types.logout:
      return {
        logged: false,
      };

    default:
      return state;
  }
}