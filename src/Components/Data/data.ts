import moment from "moment";
import DiaryData from "../types/diaryentry.type";
import { fireauth } from "../../firebase";
const entries = (): IterableIterator<[number, DiaryData]> => {
  const data: DiaryData[] = [
    {
      category: 'Utensils',
      description: 'Blender',
      image: '',
      status: false,
      startDate:'' ,
      endDate:'' ,
      firebaseUser:fireauth.currentUser?.uid,
      timeStamps:''
    },
    {
      category: 'Food',
      description: 'Blender',
      image: '',
      status: true,
      startDate:'' ,
      endDate:'' ,
      firebaseUser:fireauth.currentUser?.uid,
      timeStamps:''

    },
    {
      category: 'Grass',
      description: 'Blender',
      image: '',
      status: false,
      startDate:'' ,
      endDate:'' ,
      firebaseUser:fireauth.currentUser?.uid,
      timeStamps:''

    },
    {
      category: 'Utensils',
      description: 'Blender',
      image: '',
      status: true,
      startDate:'' ,
      endDate:'' ,
      firebaseUser:fireauth.currentUser?.uid,
      timeStamps:''

    },
  ];

  return data.entries();
};

export default entries;