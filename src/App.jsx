import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import TransitionScreen from './components/TransitionScreen';
import RegionSelect from './components/RegionSelect';
import EnrollmentForm from './components/EnrollmentForm';
import LoadingScreen from './components/LoadingScreen';
import SuccessScreen from './components/SuccessScreen';
import TakeSurveyPrompt from './components/TakeSurveyPrompt';
import SurveyScreen from './components/SurveyScreen';
import ThankYouScreen from './components/ThankYouScreen';

export default function App() {
  const [step, setStep] = useState(1);
  const [startTime, setStartTime] = useState(null);
  const [completionTime, setCompletionTime] = useState(null);
  const [region, setRegion] = useState('');
  const [formData, setFormData] = useState({});
  const [surveyData, setSurveyData] = useState({});
  const [fieldsFilledCount, setFieldsFilledCount] = useState(0);

  // Helper to delay state change so button scale-down animations are visible
  const navigateWithDelay = (nextStep, callback = null) => {
    setTimeout(() => {
      setStep(nextStep);
      if (callback) callback();
    }, 180);
  };

  // Start timer and move to the intermediate Transition Screen
  const handleStart = () => {
    setStartTime(performance.now());
    navigateWithDelay('transition');
  };

  // Helper to save participant session results to Local Storage and Google Sheets
  const saveSessionRecord = (surveyResult = null) => {
    // Loaded from environmental variables config for Vercel security
    const GOOGLE_SHEETS_WEBAPP_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL || "";

    const record = {
      timestamp: new Date().toISOString(),
      completionTimeSeconds: completionTime,
      region: region,
      surveyEase: surveyResult ? surveyResult.ease : 'N/A',
      surveyConfidence: surveyResult ? surveyResult.confidence : 'N/A',
      surveyLangPreferred: surveyResult ? surveyResult.language : 'N/A',
      surveyConfusionText: surveyResult ? surveyResult.confusion.replace(/[\n\r,]/g, ' ') : 'N/A',
      surveyFeedbackText: surveyResult ? surveyResult.feedback.replace(/[\n\r,]/g, ' ') : 'N/A'
    };

    // 1. Fallback save to Local Storage
    const existingRecords = JSON.parse(localStorage.getItem('test_connect_records') || '[]');
    existingRecords.push(record);
    localStorage.setItem('test_connect_records', JSON.stringify(existingRecords));

    // 2. Submit to Google Sheets via Apps Script Web App if URL is provided
    if (GOOGLE_SHEETS_WEBAPP_URL) {
      fetch(GOOGLE_SHEETS_WEBAPP_URL, {
        method: 'POST',
        mode: 'no-cors', // Avoid complex CORS preflight issues with Apps Script redirects
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record)
      })
      .then(() => console.log('Successfully recorded session to Google Sheets.'))
      .catch((err) => console.error('Failed to submit session to Google Sheets:', err));
    }
  };

  // Reset all state values to initialize a new usability test run
  const handleReset = () => {
    setStep(1);
    setRegion('');
    setFormData({});
    setSurveyData({});
    setFieldsFilledCount(0);
    setStartTime(null);
    setCompletionTime(null);
  };

  // Dynamic progress calculation based on active page and field completions
  const getProgress = () => {
    if (step === 1 || step === 'transition') return 0;
    if (step === 2) {
      return region ? 18 : 10;
    }
    if (step === 3) {
      const increment = region === 'USA' ? 11.66 : 23.33;
      return Math.min(30 + Math.round(fieldsFilledCount * increment), 100);
    }
    // Final stages sit at 100%
    return 100;
  };

  // Temporary screens placeholders for remaining steps to ensure the flow compiles
  const renderStep = () => {
    switch (step) {
      case 1:
        return <WelcomeScreen onStart={handleStart} />;
      case 'transition':
        return <TransitionScreen onComplete={() => setStep(2)} />;
      case 2:
        return (
          <RegionSelect
            selectedRegion={region}
            onSelectRegion={(reg) => {
              setRegion(reg);
              setFieldsFilledCount(0); // Reset filled count on region swap
            }}
            onBack={() => navigateWithDelay(1, () => setRegion(''))}
            onContinue={() => navigateWithDelay(3)}
            progress={getProgress()}
          />
        );
      case 3:
        return (
          <EnrollmentForm
            region={region}
            onBack={() => navigateWithDelay(2)}
            onSubmit={(data) => {
              setFormData(data);
              navigateWithDelay(4);
            }}
            onFieldsChange={(count) => setFieldsFilledCount(count)}
            progress={getProgress()}
          />
        );
      case 4:
        return (
          <LoadingScreen 
            onComplete={() => {
              // Calculate completion duration at the moment Success Screen appears
              const endTime = performance.now();
              const duration = parseFloat(((endTime - startTime) / 1000).toFixed(2));
              setCompletionTime(duration);
              navigateWithDelay(5);
            }} 
          />
        );
      case 5:
        return <SuccessScreen onComplete={() => navigateWithDelay(6)} />;
      case 6:
        return (
          <TakeSurveyPrompt
            onAccept={() => navigateWithDelay(7)}
            onDecline={() => {
              // Save record with N/A responses on decline
              saveSessionRecord(null);
              navigateWithDelay(8);
            }}
          />
        );
      case 7:
        return (
          <SurveyScreen
            onBack={() => navigateWithDelay(6)}
            onSubmit={(surveyResult) => {
              setSurveyData(surveyResult);
              saveSessionRecord(surveyResult);
              navigateWithDelay(8);
            }}
          />
        );
      case 8:
        return <ThankYouScreen onReset={() => navigateWithDelay(1, handleReset)} />;
      default:
        return (
          <div className="screen-transition" style={{ padding: '64px 24px', textAlign: 'center', backgroundColor: '#f2f3f5', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--primary-brand)' }}>
              Step {step} Placeholder
            </h3>
            <p style={{ margin: '20px 0', color: 'var(--secondary-text)' }}>
              Selected Region: {region}
            </p>
            <button className="btn-primary" onClick={() => navigateWithDelay(1, () => { setRegion(''); setFieldsFilledCount(0); })} style={{ margin: '0 auto' }}>
              RESET
            </button>
          </div>
        );
    }
  };

  return (
    <div className="app-container">
      {renderStep()}
    </div>
  );
}
