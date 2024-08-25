import { Loader } from "@components/elements/loader";
import { KakaoMap } from "@components/templates/kakao-map";
import { KakaoMarker } from "@components/templates/kakao-marker";
import { IStore } from "@core/interfaces/store";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

/**
 * 맛집 상세 페이지
 * @author 김기원
 */
const StoreDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { status } = useSession();

  const fetchStore = async () => {
    const { data } = await axios(`/api/stores?id=${id}`);
    return data as IStore;
  };

  const {
    data: store,
    isFetching,
    isError,
    isSuccess,
  } = useQuery(`store-${id}`, fetchStore, {
    enabled: !!id, // id가 있는 경우(true)에만 react-query를 요청한다.
    refetchOnWindowFocus: false, // window 창 focus 될 때마다 refetch 되는 것을 막는다.(기본값은 true)
  });

  // 맛집 삭제
  const onClickDeleteStore = async () => {
    const confirm = window.confirm("해당 가게를 삭제하시겠습니까?");
    if (confirm && store) {
      try {
        const result = await axios({
          method: "DELETE",
          url: `/api/stores?id=${store.id}`,
        });
        if (result.status === 200) {
          toast.success("가게를 삭제했습니다.");
          router.replace("/");
        } else {
          toast.error("다시 시도해주세요.");
        }
      } catch (e) {
        toast.error("다시 시도해주세요.");
      }
    }
  };
  return !isFetching && !isError ? (
    <>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="md:flex justify-between items-center py-4 md:py-0">
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              {store?.name}
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              {store?.address}
            </p>
          </div>
          {status === "authenticated" && store && (
            <div className="flex items-center gap-4 px-4 py-3">
              <Link
                className="underline hover:text-gray-400 text-sm"
                href={`/stores/${store?.id}/edit`}
              >
                수정
              </Link>
              <button
                type="button"
                onClick={onClickDeleteStore}
                className="underline hover:text-gray-400 text-sm"
              >
                삭제
              </button>
            </div>
          )}
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                카테고리
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.category || "-"}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                주소
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.address}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                위도
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.lat}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                경도
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.lng}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                연락처
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.phone || "-"}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                식품인증구분
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.foodCertifyName || "-"}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                업종명
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {store?.storeType || "-"}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      {isSuccess && (
        <div className="overflow-hidden w-full mb-20 max-w-5xl mx-auto max-h-[900px]">
          <KakaoMap lat={store?.lat} lng={store?.lng} zoom={1} />
          <KakaoMarker store={store} />
        </div>
      )}
    </>
  ) : isFetching ? (
    <Loader isPerMarginTop="50%" />
  ) : isError ? (
    <div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">
      다시 시도해주세요
    </div>
  ) : null;
};

export default StoreDetailPage;
