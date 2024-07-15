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
    bio: `Aldous Leonard Huxley (July 1894 - 22 November 1963) was an English writer and philosopher. His bibliography spans nearly 50 books,including novels and non-fiction works, as well as essays, narratives, and poems.`,
  },
  {
    id: 2,
    fullName: "Kurt Vonnegut",
    bio: `Kurt Vonnegut (November 11, 1922 - April 11, 2007) was an American author known for his satirical and darkly humorous novels. He published 14 novels, three short-story collections, five plays, and five nonfiction works over fifty-plus years; further collections have been published since his death.`,
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
    img: "https://m.media-amazon.com/images/I/51e-JHnQMEL._AC_UF1000,1000_QL80_.jpg",
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
