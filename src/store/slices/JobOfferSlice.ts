import { createSlice , PayloadAction} from "@reduxjs/toolkit";

//interfaces
import { JobOfferState, URLParams } from "@/interfaces/JobOffers";



export const initialState: JobOfferState = {
  urlParams: {
    q:"",
    province:""
  },
  allOffersForYoy: [],
  allOffers: [],
  isForYou:'no',
  totalPages:1,
  isLoading: true,
  error: null,
  pageSize:0,
  totalResults:0,
  currentPage:1
};

const jobOffersSlice = createSlice({
  name: "jobOffers",
  initialState,
  reducers: {
    setUrlParams: (state, action: PayloadAction<{ key: keyof URLParams; value: any }>) => {
      const { key, value } = action.payload;
      state.urlParams = {
        ...state.urlParams,
        [key]: value,
      };
    },
    setAllOffers: (state, action) => {
      state.allOffers = action.payload;
    },
    setAllOffersForYou: (state, action) => {
      state.allOffers = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload
    },
    setTotalResults: (state, action) => {
      state.totalResults = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setIsForYou:(state, action) => {
      state.isForYou = action.payload
    }
  },
});

export const {
  setAllOffers,
  setIsLoading,
  setError,
  setPageSize,
  setTotalPages,
  setTotalResults,
  setCurrentPage,
  setUrlParams,
  setIsForYou,
  setAllOffersForYou,
} = jobOffersSlice.actions;

export default jobOffersSlice.reducer;
