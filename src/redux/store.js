import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "../reducers/accountSlice";
import listSpecialistSlice from "../reducers/listSpecialistSlice";
import listDoctorSlice from "../reducers/listDoctorSlice";
import listDoctorBookingSlice from "../reducers/listDoctorBookingSlice";
import listFacilitySlice from "../reducers/listFacilitySlice";
import criteriaSearchFacilitySlice from "../reducers/criteriaSearchFacilitySlice";
import appointmentSlice from "../reducers/appointmentSlice";

export const store = configureStore({
  reducer: {
    account: accountSlice,
    listDoctor: listDoctorSlice,
    listSpecialist: listSpecialistSlice,
    listDoctorBooking: listDoctorBookingSlice,
    listFacility: listFacilitySlice,
    criteriaSearchFacility: criteriaSearchFacilitySlice,
    appointment: appointmentSlice,
  },
});
