function wordCount(count: number) {
  const wordsPerMinute = 200;
  const noOfWords = count;
  const minutes = noOfWords / wordsPerMinute;
  const readTime = Math.ceil(minutes);
  return `${readTime}`;
}

export {wordCount}