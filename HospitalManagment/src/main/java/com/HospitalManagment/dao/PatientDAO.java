package com.HospitalManagment.dao;

import java.util.List;

import com.HospitalManagment.model.Patient;

public interface PatientDAO {
	
	List<Patient> get();
	
	Patient get(int Pid);
	
	void save(Patient p);
	
	void delete(int Pid);

}
