/*
Given two strings s1 and s2, we want to visualize how different the two strings are. We will only take into account the lowercase letters (a to z). First let us count the frequency of each lowercase letters in s1 and s2.

s1 = "A aaaa bb c"

s2 = "& aaa bbb c d"

s1 has 4 'a', 2 'b', 1 'c'

s2 has 3 'a', 3 'b', 1 'c', 1 'd'

So the maximum for 'a' in s1 and s2 is 4 from s1; the maximum for 'b' is 3 from s2. In the following we will not consider letters when the maximum of their occurrences is less than or equal to 1.

We can resume the differences between s1 and s2 in the following string: "1:aaaa/2:bbb" where 1 in 1:aaaa stands for string s1 and aaaa because the maximum for a is 4. In the same manner 2:bbb stands for string s2 and bbb because the maximum for b is 3.

The task is to produce a string in which each lowercase letters of s1 or s2 appears as many times as its maximum if this maximum is strictly greater than 1; these letters will be prefixed by the number of the string where they appear with their maximum value and :. If the maximum is in s1 as well as in s2 the prefix is =:.

In the result, substrings (a substring is for example 2:nnnnn or 1:hhh; it contains the prefix) will be in decreasing order of their length and when they have the same length sorted in ascending lexicographic order (letters and digits - more precisely sorted by codepoint); the different groups will be separated by '/'. See examples and "Example Tests".

Hopefully other examples can make this clearer.

s1 = "my&friend&Paul has heavy hats! &"
s2 = "my friend John has many many friends &"
mix(s1, s2) --> "2:nnnnn/1:aaaa/1:hhh/2:mmm/2:yyy/2:dd/2:ff/2:ii/2:rr/=:ee/=:ss"

s1 = "mmmmm m nnnnn y&friend&Paul has heavy hats! &"
s2 = "my frie n d Joh n has ma n y ma n y frie n ds n&"
mix(s1, s2) --> "1:mmmmmm/=:nnnnnn/1:aaaa/1:hhh/2:yyy/2:dd/2:ff/2:ii/2:rr/=:ee/=:ss"

s1="Are the kids at home? aaaaa fffff"
s2="Yes they are here! aaaaa fffff"
mix(s1, s2) --> "=:aaaaaa/2:eeeee/=:fffff/1:tt/2:rr/=:hh"
*/

export const mix = (s1: string, s2: string): string => {
  // loop through s1. and strings of each letter will be added to the s1 array of strings
  // can check that indexOf and lastIndexOf aren't the same and that the array doesn't include the char to determine if a char should be counted
  let s1Strings: string[] = [];
  let s2Strings: string[] = [];
  let finalStringArray: string[] = [];
  let flag = false;

  for (let i: number = 0; i < s1.length; i++) {
    if (
      s1.indexOf(s1[i]) !== s1.lastIndexOf(s1[i]) &&
      s1[i].toLowerCase() !== s1[i].toUpperCase() &&
      s1[i] === s1[i].toLowerCase() &&
      i <= s1.indexOf(s1[i])
    ) {
      let newString: string = '';

      for (let j: number = 0; j < s1.length; j++) {
        // we can add each s1[i] to the newString
        if (s1[i] === s1[j]) {
          newString += s1[i];
        }
      }

      if (newString.length > 1) {
        s1Strings.push(newString);
      }
    }
  }

  // same process for s2
  for (let i: number = 0; i < s2.length; i++) {
    if (
      s2.indexOf(s2[i]) !== s2.lastIndexOf(s2[i]) &&
      s2[i].toLowerCase() !== s2[i].toUpperCase() &&
      s2[i] === s2[i].toLowerCase() &&
      i <= s2.indexOf(s2[i])
    ) {
      let newString: string = '';

      for (let j: number = 0; j < s2.length; j++) {
        // we can add each s2[i] to the newString
        if (s2[i] === s2[j]) {
          newString += s2[i];
        }
      }

      if (newString.length > 1) {
        s2Strings.push(newString);
      }
    }
  }

  // Now compare both arrays and add to the final string array applying the 1:, 2:, or =: rules
  for (let i: number = 0; i < s1Strings.length; i++) {
    for (let j: number = 0; j < s2Strings.length; j++) {
      // if the strings compare the same characters, add the correct string to the final string array
      if (s1Strings[i][0] === s2Strings[j][0]) {
        if (s1Strings[i].length > s2Strings[j].length) {
          finalStringArray.push(`1:${s1Strings[i]}`);
          flag = true;
          break;
        } else if (s1Strings[i].length < s2Strings[j].length) {
          finalStringArray.push(`2:${s2Strings[j]}`);
          flag = true;
          break;
        } else {
          finalStringArray.push(`=:${s1Strings[i]}`);
          flag = true;
          break;
        }
      }
    }
    if (!flag) {
      finalStringArray.push(`1:${s1Strings[i]}`);
    }
    flag = false;
  }

  // if s2Strings[i] isn't in final string array, add it to final string array
  // in the loop for s2Strings, add an if statement to check if the final string array already contains the current string
  for (let i: number = 0; i < s2Strings.length; i++) {
    for (let j: number = 0; j < s1Strings.length; j++) {
      // loop all the way through and if they aren't the same, throw it on the pile
      if (s2Strings[i][0] === s1Strings[j][0]) {
        flag = true;
        break;
      }
    }
    if (!flag) {
      finalStringArray.push(`2:${s2Strings[i]}`);
    }
    flag = false;
  }
  finalStringArray.sort((a, b) => a.charCodeAt(2) - b.charCodeAt(2));
  finalStringArray.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));
  finalStringArray.sort((a, b) => b.length - a.length);

  // sort the final string array before joining
  return finalStringArray.join('/');
};
