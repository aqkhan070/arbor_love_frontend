import { createSlice } from "@reduxjs/toolkit";
import { fetchQuoteOptions, createQuote } from "@/store/quoteSlice/thunk";

const initialState = {
  options: [],
  loading: false,
  index: 0,
  clientDetails: {
    name: "",
    address: "",
    phone: "",
    email: "",
    propertyOwner: "",
    additionalInfo: "",
  },
  services: [],
};

export const quoteSlice = createSlice({
  name: "quote",
  initialState,
  reducers: {
    addService: (state, action) => {
      state.services.push(action.payload);
    },
    updateService: (state, action) => {
      const { index, service } = action.payload;
      state.services[index] = { ...state.services[index], ...service };
    },
    resetQuote: (state) => {
      state.clientDetails = initialState.clientDetails;
      state.services = [];
    },
    removeService: (state, action) => {
      state.services.splice(action.payload, 1);
    },
    setServiceIndex: (state, action) => {
      state.index = action.payload;
    },
    updateClientDetails: (state, action) => {
      state.clientDetails = { ...state.clientDetails, ...action.payload };
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuoteOptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuoteOptions.fulfilled, (state, action) => {
        state.loading = false;
        state.options = action.payload;
      })
      .addCase(fetchQuoteOptions.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createQuote.pending, (state) => {
        state.loading = true;
      })
      .addCase(createQuote.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createQuote.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  addService,
  updateService,
  removeService,
  resetQuote,
  setServiceIndex,
  updateClientDetails,
} = quoteSlice.actions;

export default quoteSlice.reducer;
