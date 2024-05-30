const scores = ["Good", "Standard", "Poor"];
export function parseCreditScore(creditScore: number): string {
  return scores[creditScore];
}
