export function calculateReward(amount) {
    let points = 0;
    if (amount >= 100) {
      points = Math.round((amount - 100) * 2) + 50;
    } else if (amount > 50 ) {
      points += Math.round((amount - 50) * 1);
    } 
    return points;
  }