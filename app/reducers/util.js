import R from 'ramda';

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

// Checks to see if the token string is a case insensitive match for the expected string
// token _must_ contain:
//  '^' as a replacement for '_' in the expected string
// token _may_ contain:
//  '#' as a replacement for '*' in the expected string
//  '%' as a replacement for '/' in the expected string
// "*" and "#" characters in the token are checked for both a literal match with * in the expected string
// and if there is no literal match, the match will be attempted again, leaving single star characters
// in as part of the regex
export const tokenIsValid = (token = "", expected = "") => { 
  let normalizedToken = R.pipe(R.toLower(), R.replace(/\^/g, "_"), R.replace(/%/g, "/"), R.replace(/\*/g, "#"))(token);
  let normalizedExpected = R.pipe(R.toLower(), R.replace(/\^/g, "_"), R.replace(/%/g, "/"), R.replace(/\*/g, "#"))(expected);

  let regex = new RegExp(R.pipe(
    R.replace(/\#\#/g, "**"),
    R.match(/[^\#]+/g),
    R.map((value) => { return escapeRegExp(value) }),
    R.map((value) => (value + '*')),
    R.reduce((acc, value) => acc + value, "")
    )(normalizedToken));
    
  return (R.equals(normalizedToken, normalizedExpected)) ? true : (R.match(regex, normalizedExpected)).length > 0;
}

export const tokensAreValid = (tokens = [], tokenTemplates = []) => { 
  return (tokens.length === tokenTemplates.length) ? 
    tokens
      .map((token, index) => { return tokenIsValid(token, tokenTemplates[index]) })
      .every((element) => (element && true)) :
    false;
}