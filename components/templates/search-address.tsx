import { IStore } from "@core/interfaces/store";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

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
  return (
    <div className="col-span-full">
      <label
        htmlFor="address"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        주소 (다음 주소 검색 API) <span className="text-red-500">*</span>
      </label>
      <div className="mt-2">
        <input
          {...register("address", { required: true })}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 outline-none px-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="주소를 입력해주세요"
        />
        {errors.address?.type === "required" && (
          <div className="pt-2 text-xs text-red-600">필수 입력사항입니다.</div>
        )}
      </div>
    </div>
  );
};
