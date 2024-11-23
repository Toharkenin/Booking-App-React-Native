import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface AppointmentState {
  appointment: { service:string, date:string, startTime:string, endTime:string } | null;
}

const initialState: AppointmentState = {
    appointment: null,
};

export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<{service:string, date:string, startTime:string, endTime:string }>) => {
      state.appointment = action.payload;
    },
    add: (state, action: PayloadAction<{ service:string, date:string, startTime:string, endTime:string }>) => {
        state.appointment = action.payload;
    },
    complete: (state) => {
        state.appointment = null;
    },
  },
});

export const { set, add, complete } = appointmentSlice.actions;
export const selectAppointment = (state: RootState) => state.appointment.appointment;
export default appointmentSlice.reducer;