import type { OptimiseInput, OptimiseOutput, OptimiseMove } from '../types';
import { forecastReach } from './reach';
import { constraints } from '../mockData';
import { publishers } from '../mockData';

/**
 * Greedy optimiser: move budget from worst to best marginal CPiR
 */
export function optimiseAllocation(input: OptimiseInput): OptimiseOutput {
  const moves: OptimiseMove[] = [];
  const maxIterations = 50;
  const epsilon = 0.001; // Minimum improvement threshold
  let currentAllocations = [...input.allocations];
  let iteration = 0;
  
  while (iteration < maxIterations) {
    // Get current forecast
    const currentForecast = forecastReach({ ...input, allocations: currentAllocations });
    
    // Find publisher with worst (highest) marginal CPiR
    const worst = currentForecast.byPublisher.reduce((worst, pub) => 
      pub.marginalCpir > worst.marginalCpir ? pub : worst
    );
    
    // Find publisher with best (lowest) marginal CPiR (excluding worst)
    const best = currentForecast.byPublisher
      .filter(pub => pub.publisherId !== worst.publisherId)
      .reduce((best, pub) => 
        pub.marginalCpir < best.marginalCpir ? pub : best
      );
    
    // Check if we can improve
    if (worst.marginalCpir <= best.marginalCpir + epsilon) {
      break; // No improvement possible
    }
    
    // Calculate move amount (quantum, but respect constraints)
    const worstAlloc = currentAllocations.find(a => a.publisherId === worst.publisherId);
    const bestAlloc = currentAllocations.find(a => a.publisherId === best.publisherId);
    
    if (!worstAlloc || !bestAlloc) break;
    
    // Check constraints
    const minSpend = input.constraints?.minPerPub || constraints.minPerPub || 0;
    const maxSpend = input.constraints?.maxPerPub || constraints.maxPerPub || Infinity;
    
    const availableFromWorst = worstAlloc.spend - minSpend;
    const availableToBest = maxSpend - bestAlloc.spend;
    const moveAmount = Math.min(input.quantum, availableFromWorst, availableToBest);
    
    if (moveAmount < epsilon) break; // Can't move any more
    
    // Check inventory caps
    const worstPub = publishers.find(p => p.id === worst.publisherId);
    const bestPub = publishers.find(p => p.id === best.publisherId);
    if (worstPub && bestPub) {
      const worstCap = input.constraints?.caps?.find(c => c.publisherId === worst.publisherId);
      const bestCap = input.constraints?.caps?.find(c => c.publisherId === best.publisherId);
      
      if (worstCap) {
        const currentImps = (worstAlloc.spend / (worstPub.cpm / 1000));
        const moveImps = (moveAmount / (worstPub.cpm / 1000));
        if (currentImps - moveImps < 0) break;
      }
      
      if (bestCap) {
        const currentImps = (bestAlloc.spend / (bestPub.cpm / 1000));
        const moveImps = (moveAmount / (bestPub.cpm / 1000));
        if (currentImps + moveImps > bestCap.maxImps) {
          const allowedMove = Math.max(0, (bestCap.maxImps - currentImps) * (bestPub.cpm / 1000));
          if (allowedMove < epsilon) break;
          // Adjust move amount to respect cap
          const adjustedMove = Math.min(moveAmount, allowedMove);
          if (adjustedMove < epsilon) break;
          
          // Apply move
          currentAllocations = currentAllocations.map(a => {
            if (a.publisherId === worst.publisherId) {
              return { ...a, spend: a.spend - adjustedMove };
            }
            if (a.publisherId === best.publisherId) {
              return { ...a, spend: a.spend + adjustedMove };
            }
            return a;
          });
          
          moves.push({
            from: worst.publisherId,
            to: best.publisherId,
            amount: adjustedMove,
            reason: `Move £${(adjustedMove / 1000).toFixed(0)}k from ${worstPub.name} (CPiR: £${worst.marginalCpir.toFixed(2)}) to ${bestPub.name} (CPiR: £${best.marginalCpir.toFixed(2)})`
          });
          
          iteration++;
          continue;
        }
      }
    }
    
    // Apply move
    currentAllocations = currentAllocations.map(a => {
      if (a.publisherId === worst.publisherId) {
        return { ...a, spend: a.spend - moveAmount };
      }
      if (a.publisherId === best.publisherId) {
        return { ...a, spend: a.spend + moveAmount };
      }
      return a;
    });
    
    moves.push({
      from: worst.publisherId,
      to: best.publisherId,
      amount: moveAmount,
      reason: `Move £${(moveAmount / 1000).toFixed(0)}k from ${worstPub?.name || worst.publisherId} (CPiR: £${worst.marginalCpir.toFixed(2)}) to ${bestPub?.name || best.publisherId} (CPiR: £${best.marginalCpir.toFixed(2)})`
    });
    
    iteration++;
  }
  
  // Calculate projected gain
  const originalForecast = forecastReach({ ...input, allocations: input.allocations });
  const optimizedForecast = forecastReach({ ...input, allocations: currentAllocations });
  
  return {
    moves,
    newAllocations: currentAllocations,
    projectedGain: {
      reach1p: optimizedForecast.reach1p - originalForecast.reach1p,
      cpir: optimizedForecast.cpir - originalForecast.cpir
    }
  };
}



