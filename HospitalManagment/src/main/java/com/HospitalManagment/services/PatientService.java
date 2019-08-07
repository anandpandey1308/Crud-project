package com.HospitalManagment.services;

import java.util.List;

import com.HospitalManagment.model.Patient;

public interface PatientService {
List<Patient> get();
	
	Patient get(int Pid);
	
	void save(Patient p);
	
	void delete(int Pid);

}
