const users = [
  {
    id: 1,
    name: "admin",
    email: "admin@bookapp.com",
    password: "123xyz",
  },
];

const author = [
  {
    id: 1,
    fullName: "Aldous Huxley",
  },
  {
    id: 2,
    fullName: "Kurt Vonnegut",
  },
];

const book = [
  {
    authorId: 1,
    id: 1,
    img: "https://upload.wikimedia.org/wikipedia/en/thumb/6/62/BraveNewWorld_FirstEdition.jpg/220px-BraveNewWorld_FirstEdition.jpg",
    pubYear: 1932,
    title: "Brave New World",
  },
  {
    authorId: 1,
    id: 2,
    img: "https://upload.wikimedia.org/wikipedia/en/thumb/a/af/Island.JPG/220px-Island.JPG",
    pubYear: 1962,
    title: "Island",
  },
  {
    authorId: 1,
    id: 3,
    img: "https://upload.wikimedia.org/wikipedia/en/5/59/TimeMustHaveAStop.jpg",
    pubYear: 1945,
    title: "Time Must Have a Stop",
  },
  {
    authorId: 2,
    id: 4,
    img: "https://upload.wikimedia.org/wikipedia/en/thumb/4/46/BreakfastOfChampions%28Vonnegut%29.jpg/220px-BreakfastOfChampions%28Vonnegut%29.jpg",
    pubYear: 1973,
    title: `Breakfast of Champions, or Goodbye Blue Monday`,
  },
  {
    authorId: 2,
    id: 5,
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Slaughterhouse-Five_%28first_edition%29_-_Kurt_Vonnegut.jpg/220px-Slaughterhouse-Five_%28first_edition%29_-_Kurt_Vonnegut.jpg",
    pubYear: 1969,
    title: `Slaughterhouse-Five, or the Children's Crusade`,
  },
  {
    authorId: 2,
    id: 6,
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Cat%27s_Cradle_%281st_ed._cover%29_-_Vonnegut.jpg/220px-Cat%27s_Cradle_%281st_ed._cover%29_-_Vonnegut.jpg",
    pubYear: 1963,
    title: `Cat's Cradle`,
  },
];

module.exports = {
  users,
  author,
  book,
};
