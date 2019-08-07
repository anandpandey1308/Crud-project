package com.HospitalManagment.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.HospitalManagment.model.Patient;


@Repository
public class PatientDAOImpl implements PatientDAO {
	
	@Autowired
	private EntityManager entity;
	
	

	@Override
	public List<Patient> get() {
		Session currentSession =  entity.unwrap(Session.class);
		Query<Patient> query =  currentSession.createQuery("From Patient",Patient.class);
		List<Patient> list =  query.getResultList();
		return list;
	}

	@Override
	public Patient get(int Pid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void save(Patient p) {
		// TODO Auto-generated method stub

	}

	@Override
	public void delete(int Pid) {
		// TODO Auto-generated method stub

	}

}
