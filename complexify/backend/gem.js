const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
    responseSchema: {
      type: "object",
      properties: {
        time_complexity: {
          type: "string"
        },
        space_complexity: {
          type: "string"
        }
      },
      required: [
        "time_complexity",
        "space_complexity"
      ]
    },
  };
  
  async function run() {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "give me time and space complexity of this code\nclass Solution {\npublic:\n    int computeSum(string &s, int start) {\n        int total = 0;\n        for (int i = start; i < s.length(); i++) {\n            total += int(s[i]);\n        }\n        return total;\n    }\n\n    int solve(string &s1, string &s2, int i, int j, vector<vector<int>> &dp) {\n        int n = s1.length();\n        int m = s2.length();\n\n        if (i == n && j == m) return 0;\n        if (i == n) return computeSum(s2, j);\n        if (j == m) return computeSum(s1, i);\n\n        if (dp[i][j] != -1) return dp[i][j];\n\n        if (s1[i] == s2[j]) {\n            dp[i][j] = solve(s1, s2, i + 1, j + 1, dp);\n        } else {\n            int option1 = solve(s1, s2, i + 1, j, dp) + int(s1[i]);\n            int option2 = solve(s1, s2, i, j + 1, dp) + int(s2[j]);\n            dp[i][j] = min(option1, option2);\n        }\n\n        return dp[i][j];\n    }\n\n    int minimumDeleteSum(string s1, string s2) {\n        int n = s1.length();\n        int m = s2.length();\n        vector<vector<int>> dp(n, vector<int>(m, -1));\n        return solve(s1, s2, 0, 0, dp);\n    }\n};\n\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, let's break down the time and space complexity of this code.\n\n**Understanding the Code**\n\nThis code calculates the minimum sum of ASCII values of characters that need to be deleted from two strings, `s1` and `s2`, to make them equal. It uses a recursive approach with memoization (dynamic programming).\n\n*   `computeSum(string &s, int start)`:  Calculates the sum of ASCII values of characters in a string from a given starting index.\n*   `solve(string &s1, string &s2, int i, int j, vector<vector<int>> &dp)`: The core recursive function. It compares characters at indices `i` and `j` in `s1` and `s2`, respectively:\n    *   If characters match, proceed to the next characters in both strings (`i+1`, `j+1`).\n    *   If characters don't match, explore two options:\n        1.  Delete the character at index `i` in `s1` and move to `i+1`.\n        2.  Delete the character at index `j` in `s2` and move to `j+1`.\n    It chooses the option that results in the minimum sum. The `dp` vector stores results to avoid recalculation.\n*   `minimumDeleteSum(string s1, string s2)`: Initializes the `dp` vector and calls the `solve` function with initial indices of 0 for both strings.\n\n**Time Complexity Analysis**\n\n*   **`computeSum` function:** This function iterates through the string from the given `start` index to the end. In the worst case, it iterates through the entire length of the string. Let the length of strings be `n` and `m` the worst case time complexity is `O(max(n, m))` since it is only called when one string has been completely iterated. If it were to be called for each function it would have a time complexity `O(n*m*max(n, m))`\n\n*   **`solve` function:**\n    *   The function uses recursion and memoization (DP). \n    *   The base cases are `i == n && j == m`,  `i==n`, `j==m`.\n    *   Otherwise for each `i` and `j` it either moves `i` or `j` or both.\n    *   Without memoization it can explore 2^n options so it will have an exponential time complexity.\n    *   But with memoization the `dp` table makes sure that we only have to calculate results for each unique `i` and `j` only once.\n    *   The size of `dp` is `n x m` so the `solve` function will have a time complexity of `O(n * m)` because each cell in `dp` is computed only once.\n    *   `computeSum` is called only when base cases are reached. \n\n*   **`minimumDeleteSum` function:** This function initializes the `dp` array in `O(n*m)` and then calls the `solve` function that we already know has a time complexity of `O(n*m)`. Thus the overall time complexity remains `O(n * m)`.\n\nTherefore, the overall **time complexity of the solution is O(n * m)**, where `n` is the length of `s1` and `m` is the length of `s2`.\n\n**Space Complexity Analysis**\n\n*   **`computeSum` function:** This function uses constant space, so its space complexity is `O(1)`.\n\n*   **`solve` function:**\n    *   The space used by the recursion is bounded by the depth of the recursion.  In the worst case, the depth could be `n + m`.\n    *   The dominant space usage within `solve` is from the `dp` vector, which has a size of `n x m`, i.e. `O(n*m)`.\n\n*   **`minimumDeleteSum` function:** The function creates a `dp` table which is `O(n*m)`. It also uses a few integer variables, which contribute `O(1)` to the space complexity.\n\nTherefore, the overall **space complexity of the solution is O(n * m)**, mainly due to the `dp` vector.\n\n**Summary**\n\n*   **Time Complexity: O(n * m)**\n*   **Space Complexity: O(n * m)**\n\nWhere:\n*   `n` is the length of the string `s1`.\n*   `m` is the length of the string `s2`.\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "run\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n\"space_complexity\": \"O(n * m)\",\n\"time_complexity\": \"O(n * m)\"\n}\n```"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    console.log(result.response.text());
  }
  
  run();