import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "../reducers/accountSlice";
import listSpecialistSlice from "../reducers/listSpecialistSlice";
import listDoctorSlice from "../reducers/listDoctorSlice";
import listDoctorBookingSlice from "../reducers/listDoctorBookingSlice";
import listFacilitySlice from "../reducers/listFacilitySlice";
import criteriaSearchFacilitySlice from "../reducers/criteriaSearchFacilitySlice";
import appointmentSlice from "../reducers/appointmentSlice";
import listAccountSlice from "../reducers/listAccountSlice";
import criteriaSearchAccountSlice from "../reducers/criteriaSearchAccountSlice";
import facilitySlice from "../reducers/facilitySlice";

export const store = configureStore({
  reducer: {
    account: accountSlice,
    listDoctor: listDoctorSlice,
    listSpecialist: listSpecialistSlice,
    listDoctorBooking: listDoctorBookingSlice,
    listFacility: listFacilitySlice,
    criteriaSearchFacility: criteriaSearchFacilitySlice,
    appointment: appointmentSlice,
    listAccount: listAccountSlice,
    criteriaSearchAccount: criteriaSearchAccountSlice,
    facility: facilitySlice,
  },
});
