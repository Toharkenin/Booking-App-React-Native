import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface DateState {
  date: { date: Date } | null;
}

const initialState: DateState = {
    date: null,
};

export const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    fetchAppointments: (state, action: PayloadAction<{date: Date}>) => {
      state.date = action.payload;
    },
    removeDate: (state, action: PayloadAction<{date: Date }>) => {
        state.date = null;
    },
  },
});

export const { fetchAppointments, removeDate } = dateSlice.actions;
// export const selectAppointment = (state: RootState) => state.appointment.appointment;
export default dateSlice.reducer;