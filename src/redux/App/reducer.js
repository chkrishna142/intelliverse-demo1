import * as types from "./action.types";

const initialState = {
	blobdata: [],
	isLoading: false,
	isError: false,
};

export const reducer = (state = initialState, action) => {
	let { type, payload } = action;
	switch (type) {
		case types.GETDATA_SUCCESS: {
			console.log("payload", payload);
			return {
				blobdata: payload,
				isLoading: false,
				isError: false,
			};
		}
		default:
			return state;
	}
};
