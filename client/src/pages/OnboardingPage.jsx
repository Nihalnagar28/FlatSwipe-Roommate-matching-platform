import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userAPI, preferenceAPI } from '../services/api';
import { OnboardingLayout } from '../components/onboarding/OnboardingLayout';
import { Step1Personal } from '../components/onboarding/Step1Personal';
import { Step2Location } from '../components/onboarding/Step2Location';
import { Step3Sleep } from '../components/onboarding/Step3Sleep';
import { Step4Lifestyle } from '../components/onboarding/Step4Lifestyle';
import { Step5Cleanliness } from '../components/onboarding/Step5Cleanliness';
import { Step6Personality } from '../components/onboarding/Step6Personality';
import { Step7Preferences } from '../components/onboarding/Step7Preferences';

export const OnboardingPage = () => {
  const { user, updateUser, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(user?.onboardingStep || 1);
  const [loading, setLoading] = useState(false);

  const stepMeta = [
    { title: 'Personal Information', subtitle: 'Let prospective roommates know who you are' },
    { title: 'Target Location & Budget', subtitle: 'Where do you want to live and what is your rent budget?' },
    { title: 'Sleep & Daily Schedule', subtitle: 'Are you an early riser or a midnight coder?' },
    { title: 'Lifestyle & Social Habits', subtitle: 'Habits that determine real-world house harmony' },
    { title: 'Cleanliness Standards', subtitle: 'Kitchen, dishes, and shared apartment chore routines' },
    { title: 'Personality & Social Energy', subtitle: 'Communication style and interaction preferences' },
    { title: 'Ideal Roommate Preferences', subtitle: 'Set your ideal flatmate expectations and dealbreakers' },
  ];

  const handleStepSave = async (stepData) => {
    try {
      const res = await userAPI.updateOnboarding({
        step: currentStep,
        data: stepData,
      });
      if (res.data.success) {
        updateUser(res.data.data);
      }
      if (currentStep < 7) {
        setCurrentStep((prev) => prev + 1);
      }
    } catch (err) {
      console.error('Failed to save step:', err);
    }
  };

  const handleFinalSubmit = async (finalData) => {
    setLoading(true);
    try {
      // 1. Save preferences to UserPreference model
      await preferenceAPI.updatePreferences(finalData);

      // 2. Mark user onboarding as complete
      const res = await userAPI.completeOnboarding();
      if (res.data.success) {
        updateUser(res.data.data);
        await refreshUser();
      }
      navigate('/discover');
    } catch (err) {
      console.error('Onboarding completion error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    if (currentStep < 7) {
      setCurrentStep((prev) => prev + 1);
    } else {
      navigate('/discover');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <OnboardingLayout
      step={currentStep}
      totalSteps={7}
      title={stepMeta[currentStep - 1].title}
      subtitle={stepMeta[currentStep - 1].subtitle}
      onBack={handleBack}
      onSkip={handleSkip}
      canSkip={currentStep !== 1}
    >
      {currentStep === 1 && <Step1Personal initialData={user || {}} onNext={handleStepSave} />}
      {currentStep === 2 && <Step2Location initialData={user || {}} onNext={handleStepSave} />}
      {currentStep === 3 && <Step3Sleep initialData={user || {}} onNext={handleStepSave} />}
      {currentStep === 4 && <Step4Lifestyle initialData={user || {}} onNext={handleStepSave} />}
      {currentStep === 5 && <Step5Cleanliness initialData={user || {}} onNext={handleStepSave} />}
      {currentStep === 6 && <Step6Personality initialData={user || {}} onNext={handleStepSave} />}
      {currentStep === 7 && (
        <Step7Preferences
          initialData={user || {}}
          onNext={handleFinalSubmit}
          loading={loading}
        />
      )}
    </OnboardingLayout>
  );
};
