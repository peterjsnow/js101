//Question 4
function isDotSeparatedIpAddress(inputString) {
  let dotSeparatedWords = inputString.split(".");
  if (dotSeparatedWords.length !== 4) return false;

  dotSeparatedWords.forEach(word => {
    if (!isAnIpNumber(word)) return false;
    return true;
  });
  return true;
}