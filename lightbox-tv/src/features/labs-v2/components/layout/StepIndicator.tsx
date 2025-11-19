import React from 'react';
import { Box, Stepper, Step, StepLabel, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

interface Step {
  label: string;
  completed?: boolean;
}

interface StepIndicatorProps {
  steps: Step[];
  activeStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, activeStep }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={index} completed={step.completed || index < activeStep}>
            <StepLabel
              StepIconComponent={({ active, completed }) => (
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: completed || active ? '#02b5e7' : '#e0e0e0',
                    color: completed || active ? '#fff' : '#999',
                    fontWeight: 600,
                    fontSize: '14px',
                  }}
                >
                  {completed ? <CheckCircle sx={{ fontSize: 20 }} /> : index + 1}
                </Box>
              )}
            >
              <Typography variant="body2" sx={{ fontWeight: activeStep === index ? 600 : 400 }}>
                {step.label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};


