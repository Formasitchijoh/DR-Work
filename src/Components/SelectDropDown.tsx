import React, { useState } from 'react';

type Allowed = string | number;

type BaseProps<Value> = {
  value: Value;
  onChange: (newValue: Value) => void;
  options: readonly Value[];
  mapOptionToLabel?: (option: Value) => Allowed;
  mapOptionToValue?: (option: Value) => Allowed;
};

type Props<Value> = Value extends Allowed ? BaseProps<Value> : Required<BaseProps<Value>>;

const isAllowed = (v: any): v is Allowed => typeof v === 'string' || typeof v === 'number';

export function CustomSelect<Value>({
  value,
  onChange,
  options,
  mapOptionToLabel,
  mapOptionToValue,
}: Props<Value>) {
  const toLabel = (option: Value): Allowed => {
    if (mapOptionToLabel) {
      return mapOptionToLabel(option);
    }
    // if props are provided correctly this should never be false
    return isAllowed(option) ? option : String(option);
  };

  const toValue = (option: Value): Allowed => {
    if (mapOptionToValue) {
      return mapOptionToValue(option);
    }
    return isAllowed(option) ? option : String(option);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(options[e.target.selectedIndex]);
  };

  return (
    <select value={toValue(value)} onChange={handleChange} className='w-full h-10 bg-gray-100 mr-5 border-1 border-gray-500'>
      {options.map((value) => (
        <option value={toValue(value)} key={toValue(value)}>
          {toLabel(value)}
        </option>
      ))}
    </select>
  );
}

const FRUITS = ["apple", "banana", "melon"] ;

type Fruit = typeof FRUITS[number];

const SelectFruit = () => {
  const [selected, setSelected] = useState<Fruit>(FRUITS[0]);

  return (
    <div>
      <div>Value: {selected}</div>

      <CustomSelect value={selected} onChange={setSelected} options={FRUITS} />
    </div>
  );
};

const SelectNumber = () => {
  const [n, setN] = React.useState(0);
  return (
    <div>
      <div>Value: {n}</div>

      <CustomSelect value={n} onChange={setN} options={[0, 1, 2, 3, 5]} />
    </div>
  );
};

interface User {
  name: string;
  id: number;
}

const SelectUser = () => {
  const users: User[] = [
    {
      id: 1,
      name: 'John',
    },
    {
      id: 322,
      name: 'Susan',
    },
    {
      id: 57,
      name: 'Bill',
    },
  ];

  const [user, setUser] = React.useState(users[0]);

  return (
    <div>
      <div>Value: {JSON.stringify(user)}</div>

      <CustomSelect
        value={user}
        onChange={setUser}
        options={users}
        mapOptionToLabel={(user: User) => user.name}
        mapOptionToValue={(user: User) => user.id}
      />
    </div>
  );
};

export  const SelectDropDown = () => (
  <>
    <SelectFruit />
    {/* <SelectNumber />
    <SelectUser /> */}
  </>
);



















// import React from 'react'
// import { useState } from 'react'
// import Select from 'react-select';
// import { DiaryEntryType } from '.././Models/DiaryItem';

// type Props = {
//   entries: () => IterableIterator<[number, DiaryEntryType]>;
//   selectedOption : () => DiaryEntryType | null
//   handleChange : (Option: DiaryEntryType | null)=>  DiaryEntryType | null
// };

// const SelectDropDown = ({ entries,selectedOption,handleChange }: Props) => {
//   // const [selectedOption, setSelectedOption] = useState<DiaryEntryType | null>(null);
//   // const handleChange = (option: DiaryEntryType | null) => {
//   //   setSelectedOption(option );
//   // };

//   return (
//     <div className='mt-2'>
//       <Select
//         placeholder="Select Option"
//         isClearable={true}
//         value={selectedOption}
//         options={Array.from(entries(), ([, value]) => value)}
//         onChange={handleChange}
//         getOptionLabel={(e) => e.category}
//       />
//       {selectedOption && (
//         <div style={{ marginTop: 20, lineHeight: '25px' }}>
//           <b>Selected Option:</b>
//           {selectedOption.category}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SelectDropDown;