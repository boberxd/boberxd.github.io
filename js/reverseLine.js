let symbols = {
  'а': 'ɐ',
  'б': 'g',
  'в': 'ʚ',
  'г': 'ɹ',
  'д': '6',
  'е': 'ǝ',
  'ё': 'ǝ',
  'ж': 'ж',
  'з': 'ε',
  'и': 'и',
  'й': 'и',
  'к': 'ʞ',
  'л': 'v',
  'м': 'w',
  'н': 'н',
  'о': 'о',
  'п': 'u',
  'р': 'd',
  'с': 'ɔ',
  'т': 'ɯ',
  'у': 'ʎ',
  'ф': 'ф',
  'х': 'х',
  'ц': 'ц',
  'ч': 'Һ',
  'ш': 'm',
  'щ': 'm',
  'ъ': 'q',
  'ы': 'ıq',
  'ь': 'q',
  'э': 'є',
  'ю': 'q',
  'я': 'ʁ',
  ' ': ' ',
  '!': '¡',
  '?': '¿',
  ',': '\'',
  'a': 'ɐ',
  'b': 'q',
  'c': 'ɔ',
  'd': 'p',
  'e': 'ǝ',
  'f': 'ɟ',
  'g': 'ƃ',
  'h': 'ɥ',
  'i': 'ı',
  'j': 'ɾ',
  'k': 'ʞ',
  'l': 'l',
  'm': 'ɯ',
  'n': 'u',
  'o': 'o',
  'p': 'd',
  'q': 'b',
  'r': 'ɹ',
  's': 's',
  't': 'ʇ',
  'u': 'n',
  'v': 'ʌ',
  'w': 'ʍ',
  'x': 'x',
  'y': 'ʎ',
  'z': 'z'
}

let reverseStr = (str) => {
  let text = str.toLowerCase().split('');
  let reversedText = [];

  text.forEach((letter) => {
    reversedText.push(symbols[letter])
  })

  return reversedText.reverse().join('');
}

let input = document.getElementById('input');
let result = document.getElementById('result');

let updateResult = () => {
  result.value = reverseStr(input.value);
}
