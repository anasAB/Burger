import * as actionTypes from "./actionTypes";
import Axios from "axios";

// export const authStart = () => {
//   return {
//     type: actionTypes.AUTH_START
//   };
// };

// export const authSuccess = (token, userId) => {
//   return {
//     type: actionTypes.AUTH_START_SUCCESS,
//     token: token,
//     userId: userId
//   };
// };

// export const authFail = error => {
//   return {
//     type: actionTypes.AUTH_START_FAIL,
//     error: error
//   };
// };

// export const auth = (email, password, isSignUp) => {
//   console.log("Action isSignUp", isSignUp, "Email", email);
//   return dispatch => {
//     dispatch(authStart());
//     //! Pass the Data that we recive to the post
//     const authData = {
//       email: email,
//       password: password,
//       returnSecureToken: true
//     };

//     let url =
//       "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA_0A5w2lKkvA5eWutrLoQaiozPbH0JHww";

//     if (isSignUp) {
//       url =
//         "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA_0A5w2lKkvA5eWutrLoQaiozPbH0JHww";
//     }

//     console.log("url", url);

//     Axios.post(url, authData)
//       .then(response => {
//         console.log("response", response.data);
//         dispatch(authSuccess(response.data.idToken, response.data.localId));
//       })
//       .catch(error => {
//         console.log("error.response", error.response);
//         dispatch(authFail(error.response));
//       });
//   };
// };

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userID");

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeOut = (expiresIn) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logOut());
    }, expiresIn * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA_0A5w2lKkvA5eWutrLoQaiozPbH0JHww";
    if (!isSignup) {
      url =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA_0A5w2lKkvA5eWutrLoQaiozPbH0JHww";
    }
    Axios.post(url, authData)
      .then((response) => {
        console.log("#response", response);
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken); //! store the token in the browser
        localStorage.setItem("expirationDate", expirationDate); //! store the expirationDate in the browser
        localStorage.setItem("userID", response.data.localId);

        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeOut(response.data.expiresIn));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const SetAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

//! when we load the page we wan to keep the User Data as long as the expirationTime not true
export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(logOut());
    } else {
      const expirationTime = new Date(localStorage.getItem("expirationDate"));
      console.log("#expirationTime", expirationTime, "Current ime", new Date());

      if (expirationTime < new Date()) {
        dispatch(logOut());
      } else {
        const userId = localStorage.getItem("userID");
        dispatch(authSuccess(token, userId));

        dispatch(
          checkAuthTimeOut(
            (expirationTime.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
