import DiaryData from "../types/diaryentry.type";
const entries = (): IterableIterator<[number, DiaryData]> => {
  const data: DiaryData[] = [
    {
      category: 'Utensils',
      description: 'Blender',
      image: '',
      status: false,
      timeStamps:''
    },
    {
      category: 'Food',
      description: 'Blender',
      image: '',
      status: true,
      timeStamps:''

    },
    {
      category: 'Grass',
      description: 'Blender',
      image: '',
      status: false,
      timeStamps:''

    },
    {
      category: 'Utensils',
      description: 'Blender',
      image: '',
      status: true,
      timeStamps:''

    },
  ];

  return data.entries();
};

export default entries;