
import { LOGIN, LOGIN_SUCCESS, LOGIN_ERROR } from '../actions/index';

// Initial State
const initialState = {
    server: "",
    serverCredentials: "",
    authenticated: false,
    isConnecting: false,
    apiError: null
}

// Reducer
export function credentials(state = initialState, action = {}) {
    switch (action.type) {
        case LOGIN:
            if (action.error) {
                return {
                    ...state,
                    isConnecting: false,
                    apiError: {
                        ...action.payload, 
                        name: "Authentication error", 
                        reason: "Unable to contact server or API call invalid.",
                        action: "Please try again or contact your administrator if the error persists"
                    },
                    authenticated: false
                }
            }
            else {
                return {
                    ...state,
                    isConnecting: true,
                    server: action.meta.server,
                    serverCredentials: action.meta.serverCredentials
                }
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isConnecting: false,
                apiError: null,                
                authenticated: true
            }
        case LOGIN_ERROR:
            return {
                ...state,
                isConnecting: false,
                apiError: {
                    ...action.payload,
                    name: "Authentication error",
                    reason: "Invalid login or insufficient permissions.",
                    action: "Please ensure you are using an account with system admin permissions"
                },
                authenticated: false
            }
        default:
            return state;
    }
}

