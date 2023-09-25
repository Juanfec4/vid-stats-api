//Analyze text
export const pullStats = (text) => {
  // Tokenize the text and make everything lowercase to ensure case-insensitive matching
  const words = text.toLowerCase().split(/\W+/).filter(Boolean); // filter(Boolean) ensures empty strings are removed

  //Return object with all the results
  return {
    occurrences: getWordFrequencyDistribution(words),
    longest_word: getLongestWord(words),
    shortest_word: getShortestWord(words),
    avg_word_length: averageWordLength(words),
    vocabulary_richness: vocabularyRichness(words),
    most_common_prefix: mostCommonPrefix(words),
    most_common_suffix: mostCommonSuffix(words),
    common_bigrams: commonBigrams(text),
  };
};

//Create a frequency distribution counting word encounters
const getWordFrequencyDistribution = (words) => {
  // Count occurrences of each word
  const wordCounts = words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {});
  //Create a frequency distribution counting word encounters
  const groupedFrequencyDistribution = Object.entries(wordCounts).reduce(
    (acc, [word, count]) => {
      if (!acc[count]) {
        acc[count] = [];
      }
      acc[count].push(word);
      return acc;
    },
    {}
  );
  return groupedFrequencyDistribution;
};

//Get the shortest word
const getShortestWord = (words) => {
  return words.reduce((shortest, current) => {
    return current.length < shortest.length ? current : shortest;
  }, words[0]);
};

//Get the longest word
const getLongestWord = (words) => {
  return words.reduce((longest, current) => {
    return current.length > longest.length ? current : longest;
  }, words[0]);
};

//Get the average word length
const averageWordLength = (words) => {
  const totalLength = words.reduce((sum, word) => sum + word.length, 0);
  return totalLength / words.length;
};

//Get the vocabulary richness via unique word occurrences
const vocabularyRichness = (words) => {
  const uniqueWords = new Set(words);
  return uniqueWords.size / words.length;
};

//Get the most common prefix
const mostCommonPrefix = (words) => {
  const prefixes = words.map((word) => word.slice(0, 3)).filter(Boolean);
  return mostCommonItem(prefixes);
};

//Get the most common suffix
const mostCommonSuffix = (words) => {
  const suffixes = words.map((word) => word.slice(-3)).filter(Boolean);
  return mostCommonItem(suffixes);
};

//Get the most common item (helper)
const mostCommonItem = (items) => {
  const counts = items.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
};

//Get the most common consecutive sequence (bigram)
const commonBigrams = (text) => {
  const sentences = text
    .toLowerCase()
    .split(/[.!?]/)
    .map((s) => s.trim());
  const bigrams = [];

  for (const sentence of sentences) {
    const words = sentence.split(/\W+/).filter(Boolean);
    for (let i = 0; i < words.length - 1; i++) {
      bigrams.push(words[i] + " " + words[i + 1]);
    }
  }

  return mostCommonItem(bigrams);
};
