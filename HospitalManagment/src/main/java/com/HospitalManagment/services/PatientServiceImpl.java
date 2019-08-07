package com.HospitalManagment.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.HospitalManagment.dao.PatientDAO;
import com.HospitalManagment.model.Patient;

@Service
public class PatientServiceImpl implements PatientService {
	
	@Autowired
	private PatientDAO patientDao;
	
	@Transactional
	@Override
	public List<Patient> get() {
		return patientDao.get();
	}
	
	@Transactional
	@Override
	public Patient get(int Pid) {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Transactional
	@Override
	public void save(Patient p) {
		// TODO Auto-generated method stub

	}
	
	@Transactional
	@Override
	public void delete(int Pid) {
		// TODO Auto-generated method stub

	}

}
