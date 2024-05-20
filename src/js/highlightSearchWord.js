export default function highlightCategory(category, searchWord) {
  let regex = new RegExp(searchWord, "gi");
  category = category.replace(regex, `<mark>$&</mark>`);
  return category;
}

 