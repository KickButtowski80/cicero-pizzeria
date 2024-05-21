const highlightCategory = (category, searchWord ) => {
    // if (searchWord === undefined) {
    //     return category;
    // }
    debugger;
  const regex = new RegExp(searchWord, "gi");
    category = category.replace(regex, `<mark>$&</mark>`);
    return category;
};

export default highlightCategory;
