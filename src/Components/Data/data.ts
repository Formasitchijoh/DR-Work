import moment from "moment";
import DiaryData from "../types/diaryentry.type";
const entries = (): IterableIterator<[number, DiaryData]> => {
  const data: DiaryData[] = [
    {
      category: 'Utensils',
      description: 'Blender',
      image: '',
      status: false,
      startDate:'',
      endDate:'',
      timeStamps:''
    },
    {
      category: 'Food',
      description: 'Blender',
      image: '',
      status: true,
      startDate:'',
      endDate:'',
      timeStamps:''

    },
    {
      category: 'Grass',
      description: 'Blender',
      image: '',
      status: false,
      startDate:'',
      endDate:'',
      timeStamps:''

    },
    {
      category: 'Utensils',
      description: 'Blender',
      image: '',
      status: true,
      startDate:'',
      endDate:'',
      timeStamps:''

    },
  ];

  return data.entries();
};

export default entries;