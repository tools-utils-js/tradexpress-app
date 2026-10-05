/**
 * Community Feedback & Idea Sorting Algorithms
 * Reference this file inside Chrome DevTools Console or your frontend project.
 */

const SortingAlgorithms = {
  /**
   * 1. Hacker News Hot Trending Sort
   * Ranks items based on volume and velocity while decaying older posts over time.
   * 
   * @param {number} upvotes - Total upvotes received
   * @param {number} downvotes - Total downvotes received
   * @param {Date|string|number} createdAt - Creation timestamp
   * @param {number} [gravity=1.8] - Speed of time-decay (higher = items drop faster)
   * @returns {number} Score (higher scores rank first)
   */
  getHotScore(upvotes, downvotes, createdAt, gravity = 1.8) {
    const score = upvotes - downvotes;
    
    // Calculate age in hours
    const createdMs = new Date(createdAt).getTime();
    const nowMs = Date.now();
    const ageInHours = Math.max(0, (nowMs - createdMs) / (1000 * 60 * 60));
    
    // Hacker News Algorithm Formula: Score = (Votes - 1) / (Hours + 2)^Gravity
    // Adjusted here to maintain base score integrity
    return score / Math.pow(ageInHours + 2, gravity);
  },

  /**
   * 2. Wilson Score Interval (Confidence Sort)
   * Ranks items strictly by quality ratio, ensuring new items with 100% positive
   * feedback don't unfairly outrank older items with thousands of positive reviews.
   * 
   * @param {number} upvotes - Total upvotes received
   * @param {number} downvotes - Total downvotes received
   * @param {number} [confidence=0.95] - Confidence level (e.g., 0.95 for 95%)
   * @returns {number} Lower bound score between 0 and 1
   */
  getWilsonScore(upvotes, downvotes, confidence = 0.95) {
    const total = upvotes + downvotes;
    if (total === 0) return 0;

    const positiveRatio = upvotes / total;
    
    // Map common confidence intervals to Z-scores
    const zScores = { 0.90: 1.64485, 0.95: 1.95996, 0.99: 2.57583 };
    const z = zScores[confidence] || 1.95996;

    const zSquared = z * z;
    const denominator = 1 + zSquared / total;
    
    const center = positiveRatio + zSquared / (2 * total);
    const spread = z * Math.sqrt((positiveRatio * (1 - positiveRatio) + zSquared / (4 * total)) / total);
    
    // Calculate the lower bound of Wilson score interval
    return (center - spread) / denominator;
  },

  /**
   * Utility method to sort a collections array
   * @param {Array} items - Array of idea/feedback objects
   * @param {'hot'|'wilson'} strategy - Selected sorting mode
   * @returns {Array} Sorted copy of the original array
   */
  sortCommunityIdeas(items, strategy = 'hot') {
    return [...items].sort((a, b) => {
      const scoreA = strategy === 'hot' 
        ? this.getHotScore(a.upvotes || 0, a.downvotes || 0, a.createdAt)
        : this.getWilsonScore(a.upvotes || 0, a.downvotes || 0);

      const scoreB = strategy === 'hot'
        ? this.getHotScore(b.upvotes || 0, b.downvotes || 0, b.createdAt)
        : this.getWilsonScore(b.upvotes || 0, b.downvotes || 0);

      return scoreB - scoreA; // Descending order
    });
  }
};

// Example Usage & Local Testing Data
const mockIdeas = [
  { id: 1, title: "Dark mode for panel", upvotes: 120, downvotes: 5, createdAt: Date.now() - (4 * 3600 * 1000) }, // 4 hours ago
  { id: 2, title: "Export to CSV feature", upvotes: 15, downvotes: 0, createdAt: Date.now() - (0.5 * 3600 * 1000) }, // 30 mins ago
  { id: 3, title: "Legacy Bug fix", upvotes: 1200, downvotes: 400, createdAt: Date.now() - (72 * 3600 * 1000) } // 3 days ago
];

console.log("Sorted by Hot/Trending:", SortingAlgorithms.sortCommunityIdeas(mockIdeas, 'hot'));
console.log("Sorted by Quality/Wilson:", SortingAlgorithms.sortCommunityIdeas(mockIdeas, 'wilson'));

export default SortingAlgorithms;

