import { testUserCredentials } from "./testUser"

export const initialState = {
    status: "checking", // authenticated // not-authenticated
    user: {},
    errorMessage: null,
}

export const authenticatedState = {
    status: "authenticated", // authenticated // not-authenticated
    user: testUserCredentials,
    errorMessage: null,
}

export const notAuthenticatedState = {
    status: "not-authenticated", // authenticated // not-authenticated
    user: {},
    errorMessage: null,
}
