import type { Audience, Channel } from '../../types';

// Calculate audience fit score based on demographic overlap
export const calculateAudienceFit = (audience: Audience, channel: Channel): number => {
  // Simplified fit calculation based on channel category and audience demographics
  let fitScore = 0.5; // Base score
  
  // Linear TV: better for older, broader audiences
  if (channel.category === 'linear') {
    if (audience.demographics.ageMin && audience.demographics.ageMin >= 25) {
      fitScore += 0.2;
    }
    if (audience.demographics.ageMax && audience.demographics.ageMax >= 45) {
      fitScore += 0.15;
    }
  }
  
  // BVOD: good for 25-54
  if (channel.category === 'bvod') {
    if (audience.demographics.ageMin && audience.demographics.ageMin >= 25) {
      fitScore += 0.15;
    }
    if (audience.demographics.ageMax && audience.demographics.ageMax <= 54) {
      fitScore += 0.15;
    }
  }
  
  // CTV: similar to BVOD
  if (channel.category === 'ctv') {
    if (audience.demographics.ageMin && audience.demographics.ageMin >= 25) {
      fitScore += 0.15;
    }
  }
  
  // Social: better for younger audiences
  if (channel.category === 'social') {
    if (audience.demographics.ageMax && audience.demographics.ageMax <= 45) {
      fitScore += 0.2;
    }
    if (audience.demographics.interests && audience.demographics.interests.length > 0) {
      fitScore += 0.1;
    }
  }
  
  // OLV: broad appeal
  if (channel.category === 'olv') {
    fitScore += 0.1;
  }
  
  return Math.min(1, Math.max(0, fitScore));
};


