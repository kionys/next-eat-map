import { Loader } from "@components/elements/loader";
import { SearchAddress } from "@components/templates/search-address";
import {
  CATEGORY_ARR,
  FOOD_CERTIFY_ARR,
  STORE_TYPE_ARR,
} from "@core/data/store";
import { IStore } from "@core/interfaces/store";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

/**
 * 맛집 수정 페이지
 * @author 김기원
 */
const StoreEditPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const fetchStore = async () => {
    const { data } = await axios(`/api/stores?id=${id}`);
    return data as IStore;
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IStore>();

  const {
    data: store,
    isFetching,
    isSuccess,
    isError,
  } = useQuery(`store-${id}`, fetchStore, {
    onSuccess: data => {
      console.log(data);
      setValue("id", data.id);
      setValue("name", data.name);
      setValue("phone", data.phone);
      setValue("lat", data.lat);
      setValue("lng", data.lng);
      setValue("address", data.address);
      setValue("foodCertifyName", data.foodCertifyName);
      setValue("storeType", data.storeType);
      setValue("category", data.category);
    },
    refetchOnWindowFocus: false,
  });

  console.log(store);
  return !isFetching && !isError ? (
    <>
      <form
        className="px-4 md:max-w-4xl mx-auto py-8"
        onSubmit={handleSubmit(async data => {
          try {
            const result = await axios({
              method: "PUT",
              url: `/api/stores`,
              data: { ...data },
            });

            if (result.status === 200) {
              toast.success("맛집을 수정했습니다.");
              router.replace(`/stores/${result?.data?.id}`);
            } else {
              toast.error("다시 시도해주세요.");
            }
          } catch (e: any) {
            toast.error("데이터 처리중 문제가 생겼습니다. 다시 시도해주세요.");
            console.log(e);
          }
        })}
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              맛집 수정
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              아래 내용을 입력해서 맛집을 수정해주세요
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 outline-none px-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
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
                    className="block w-full rounded-md border-0 h-[36px] py-1.5 text-gray-900 shadow-sm ring-1 outline-none px-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 outline-none px-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
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
                주소 <span className="text-red-500">*</span>
              </label>
              <div className="mt-2">
                <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
                  <input
                    {...register("address", { required: true })}
                    className="col-span-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 outline-none px-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    placeholder="주소를 입력해주세요"
                    readOnly
                  />
                </div>
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
                    className="block w-full rounded-md border-0 h-[36px] py-1.5 text-gray-900 shadow-sm ring-1 outline-none px-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
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
                    className="block w-full rounded-md border-0 h-[36px] py-1.5 text-gray-900 shadow-sm ring-1 outline-none px-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
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
            onClick={() => router.back()}
          >
            취소
          </button>
          <button
            type="submit"
            className="rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            수정하기
          </button>
        </div>
      </form>
    </>
  ) : isFetching ? (
    <Loader isPerMarginTop="50%" />
  ) : isError ? (
    <div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">
      다시 시도해주세요
    </div>
  ) : null;
};

export default StoreEditPage;
