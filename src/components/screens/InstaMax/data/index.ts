export const randomImageSource = 'https://picsum.photos/300/300';

export const STORIES = [
  {
    image: randomImageSource,
    name: 'Your stories',
  },
  {
    image: randomImageSource,
    name: 'Ann1',
  },
  {
    image: randomImageSource,
    name: 'sfsfd',
  },
  {
    image: randomImageSource,
    name: 'Apple 2',
  },
  {
    image: randomImageSource,
    name: 'Google 3',
  },
  {
    image: randomImageSource,
    name: 'Samsung 4',
  },
  {
    image: randomImageSource,
    name: 'Pixel 6',
  },
  {
    image: randomImageSource,
    name: 'Design raccoon 7',
  },
  {
    image: randomImageSource,
    name: 'Data flow 8',
  },
  {
    image: randomImageSource,
    name: 'Macbook 9',
  },
  {
    image: randomImageSource,
    name: 'Pesik 10',
  },
];

export type MediaGrid = Array<Array<string>>;

const generateMediaGrid = (): MediaGrid => {
  return new Array(10).fill(new Array(20).fill(randomImageSource));
};

export const INSTA_MAX_MEDIA_GRID = generateMediaGrid();
