"use client";
import React, { useState, useEffect } from 'react';
import qualificationsData from '../data/qualifications.json';
import assessmentsData from '../data/assessments.json';
import unitsData from '../data/units.json';

const Page = () => {
  const [selectedQualification, setSelectedQualification] = useState('');
  const [selectedGrades, setSelectedGrades] = useState({});
  const [globalScore, setGlobalScore] = useState(0);
  const [overallGrade, setOverallGrade] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    if (token) {
      // Load selected qualification and grades from token in URL
      const parsedToken = JSON.parse(atob(token));
      setSelectedQualification(parsedToken.qualification);
      setSelectedGrades(parsedToken.grades);
    }
  }, []);

  useEffect(() => {
    // Save selected qualification and grades to URL
    if (selectedQualification) {
      const token = btoa(JSON.stringify({ qualification: selectedQualification, grades: selectedGrades }));
      window.history.replaceState(null, '', `?token=${token}`);
    }
  }, [selectedQualification, selectedGrades]);

  useEffect(() => {
    if (!selectedQualification) return; // Do nothing if no qualification is selected

    // Calculate global score when selectedGrades changes
    let score = 0;
    Object.keys(selectedGrades).forEach((unitNumber) => {
      const grade = selectedGrades[unitNumber];
      const unit = assessmentsData.find((unit) => unit.unitNumber === parseInt(unitNumber));
      if (unit && grade) {
        const unitSize = unit.unitSize.toString();
        const isExternal = unit.isExternalAssesment;
        const gradingUnits = unitsData[isExternal ? 'external' : 'internal'][unitSize];
        let points = gradingUnits[grade];
        // If it's an external assessment and the grade is Near Pass, add NP points
        if (isExternal && grade === 'NP') {
          points = gradingUnits['NP'];
        }
        score += points;
      }
    });
    setGlobalScore(score);
  }, [selectedGrades, selectedQualification]);

  useEffect(() => {
    if (!selectedQualification) return; // Do nothing if no qualification is selected

    // Calculate overall grade based on global score and grading summary of selected qualification
    const summary = qualificationsData[selectedQualification].summary;
    let grade = '';
    Object.keys(summary).forEach((key) => {
      if (globalScore >= summary[key]) {
        grade = key;
      }
    });
    setOverallGrade(grade);
  }, [selectedQualification, globalScore]);

  const handleQualificationChange = (e) => {
    setSelectedQualification(e.target.value);
    // Reset selectedGrades and overallGrade when qualification changes
    setSelectedGrades({});
    setOverallGrade('');
  };

  const handleGradeChange = (unitNumber, e) => {
    const grade = e.target.value;
    setSelectedGrades(prevGrades => ({ ...prevGrades, [unitNumber]: grade }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-800 text-white">
      <div className="w-full max-w-2xl p-8">
        <h1 className="text-3xl font-semibold mb-4 text-center">BTEC Pearson L3 ICT Calculator</h1>
        <div className="mb-4">
          <label className="block text-gray-400">Select Qualification:</label>
          <select
            value={selectedQualification}
            onChange={handleQualificationChange}
            className="mt-1 block w-full rounded-md border-gray-600 dark:border-gray-400 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select</option>
            {Object.keys(qualificationsData).map((qualificationKey) => (
              <option key={qualificationKey} value={qualificationKey}>
                {qualificationsData[qualificationKey].name}
              </option>
            ))}
          </select>
        </div>

        {selectedQualification && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Unit Grades for {qualificationsData[selectedQualification].name}</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {assessmentsData.map((unit) => (
                <div key={unit.unitNumber}>
                  <label className="block text-gray-400">{unit.unitNumber} | {unit.nameTitle}</label>
                  <select
                    value={selectedGrades[unit.unitNumber] || ''}
                    onChange={(e) => handleGradeChange(unit.unitNumber, e)}
                    className="mt-1 block w-32 rounded-md border-gray-600 dark:border-gray-400 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select Grade</option>
                    <option value="U">Unclassified</option>
                    <option value="P">Pass</option>
                    <option value="M">Merit</option>
                    <option value="D">Distinction</option>
                    {unit.isExternalAssesment && <option value="NP">Near Pass</option>}
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}
         <br />
      <br />
      <br />
      <br />
      <br />

      </div>
     
      {selectedQualification && (
        <div className="bg-gray-900 py-4 px-4 text-center fixed bottom-0 left-0 right-0">
          <h2 className="text-xl font-semibold">Overall Score: {globalScore}</h2>
          <h2 className="text-xl font-semibold mt-2">Overall Grade: {overallGrade}</h2>
        </div>
      )}
    </div>
  );
};

export default Page;
