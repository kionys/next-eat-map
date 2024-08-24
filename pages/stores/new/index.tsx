import { SearchAddress } from "@components/templates/search-address";
import {
  CATEGORY_ARR,
  FOOD_CERTIFY_ARR,
  STORE_TYPE_ARR,
} from "@core/data/store";
import { IStore } from "@core/interfaces/store";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
/**
 * 맛집 생성 페이지
 * https://react-hook-form.com/get-started
 * @author 김기원
 */
const StoreNewPage = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IStore>();

  return (
    <form
      className="px-4 md:max-w-4xl mx-auto py-8"
      onSubmit={handleSubmit(async data => {
        try {
          const result = await axios({
            method: "POST",
            url: `/api/stores`,
            data: data,
          });

          if (result.status === 200) {
            toast.success("맛집을 등록했습니다.");
            router.replace(`/stores/${result?.data?.id}`);
          } else {
            toast.error("다시 시도해주세요.");
          }
        } catch (e: any) {
          toast.error("데이터 생성중 문제가 생겼습니다. 다시 시도해주세요.");
          console.log(e);
        }
      })}
    >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            맛집 등록
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            아래 내용을 입력해서 맛집을 등록해주세요
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                가게명 <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 outline-none px-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="가게명을 입력해주세요"
                />
                {errors.name?.type === "required" && (
                  <div className="pt-2 text-xs text-red-600">
                    필수 입력사항입니다.
                  </div>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                카테고리 <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <select
                  {...register("category", { required: true })}
                  className="block w-full rounded-md border-0 h-[36px] py-1.5 text-gray-900 shadow-sm ring-1 outline-none px-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value={""}>카테고리 선택</option>
                  {CATEGORY_ARR?.map((category, i) => {
                    return (
                      <option key={i} value={category}>
                        {category}
                      </option>
                    );
                  })}
                </select>
                {errors.category?.type === "required" && (
                  <div className="pt-2 text-xs text-red-600">
                    필수 입력사항입니다.
                  </div>
                )}
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                연락처 <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  {...register("phone", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 outline-none px-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="연락처를 입력해주세요"
                />
                {errors.phone?.type === "required" && (
                  <div className="pt-2 text-xs text-red-600">
                    필수 입력사항입니다.
                  </div>
                )}
              </div>
            </div>

            {/* <div className="col-span-full">
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                주소 (다음 주소 검색 API){" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <input
                  {...register("address", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 outline-none px-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="주소를 입력해주세요"
                />
                {errors.address?.type === "required" && (
                  <div className="pt-2 text-xs text-red-600">
                    필수 입력사항입니다.
                  </div>
                )}
              </div>
            </div> */}
            <SearchAddress
              setValue={setValue}
              register={register}
              errors={errors}
            />

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                식품인증구분 <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <select
                  {...register("foodCertifyName", { required: true })}
                  className="block w-full rounded-md border-0 h-[36px] py-1.5 text-gray-900 shadow-sm ring-1 outline-none px-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value={""}>식품인증구분 선택</option>
                  {FOOD_CERTIFY_ARR?.map((foodCertifyName, i) => {
                    return (
                      <option key={i} value={foodCertifyName}>
                        {foodCertifyName}
                      </option>
                    );
                  })}
                </select>
                {errors.foodCertifyName?.type === "required" && (
                  <div className="pt-2 text-xs text-red-600">
                    필수 입력사항입니다.
                  </div>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="storeType"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                업종구분 <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <select
                  {...register("storeType", { required: true })}
                  className="block w-full rounded-md border-0 h-[36px] py-1.5 text-gray-900 shadow-sm ring-1 outline-none px-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value={""}>업종구분 선택</option>
                  {STORE_TYPE_ARR?.map((storeType, i) => {
                    return (
                      <option key={i} value={storeType}>
                        {storeType}
                      </option>
                    );
                  })}
                </select>
                {errors.storeType?.type === "required" && (
                  <div className="pt-2 text-xs text-red-600">
                    필수 입력사항입니다.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          취소
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          등록하기
        </button>
      </div>
    </form>
  );
};

export default StoreNewPage;
