import { IS_LOADING, DONE_LOADING } from "./types";

export const startLoading = () => {
    return {
      type: IS_LOADING
    };
};

export const stopLoading = () => {
    return {
        type: DONE_LOADING
    }
}