import { DISTRICT_ARR } from "@core/data/store";
import { Dispatch, SetStateAction } from "react";
import { AiOutlineSearch } from "react-icons/ai";

interface IPropsSearchFilter {
  setQ: Dispatch<SetStateAction<string | null>>;
  setDistrict: Dispatch<SetStateAction<string | null>>;
}

export const SearchFilter = ({ setQ, setDistrict }: IPropsSearchFilter) => {
  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    name === "q" && setQ(value);
    name === "district" && setDistrict(value);
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 my-4">
      <div className="flex items-center justify-center w-full gap-2">
        <AiOutlineSearch className="w-6 h-6" />
        <input
          type="search"
          name="q"
          className="block w-full p-3 text-sm text-gray-800 border border-gray-300 rounded-lg bg-gray-50 outline-none focus:border-blue-500 focus:border-2"
          placeholder="음식점 검색"
          onChange={onChangeInput}
        />
      </div>
      <select
        name="district"
        id="district"
        className="bg-gray-50 border border-gray-300 text-gray-800 text-sm md:max-w-[200px] rounded-lg focus:border-blue-500 block w-full p-3 outline-none pr-2"
        onChange={onChangeInput}
      >
        <option value="">지역 선택</option>
        {DISTRICT_ARR.map((item: string) => {
          return (
            <option value={item} key={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};
