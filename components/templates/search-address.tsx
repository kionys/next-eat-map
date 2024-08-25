import { IStore } from "@core/interfaces/store";
import { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { AiOutlineSearch } from "react-icons/ai";
interface IPropsSearchAddress {
  setValue: UseFormSetValue<IStore>;
  register: UseFormRegister<IStore>;
  errors: FieldErrors<IStore>;
}
export const SearchAddress = ({
  register,
  errors,
  setValue,
}: IPropsSearchAddress) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // https://www.npmjs.com/package/react-daum-postcode
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setValue("address", fullAddress);
    setIsOpen(false);
    // console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };
  return (
    <>
      <div className="col-span-full">
        <label
          htmlFor="address"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          주소
        </label>
        <div className="mt-2">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            <input
              readOnly
              placeholder="주소를 검색해주세요"
              {...register("address", { required: true })}
              className="col-span-2 block w-full rounded-md border-0 py-1.5 px-2 outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
            <button
              type="button"
              onClick={() => setIsOpen(val => !val)}
              className="flex justify-center items-center gap-1 bg-blue-700 text-md hover:bg-gray-600 py-1.5 px-2 rounded text-white"
            >
              <AiOutlineSearch />
              주소 검색
            </button>
          </div>
          {errors?.address?.type === "required" && (
            <div className="pt-2 text-xs text-red-600">
              필수 입력사항입니다.
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="border border-gray-300 w-full col-span-full md:col-span-3 rounded-md p-2">
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </div>
      )}
    </>
  );
};
