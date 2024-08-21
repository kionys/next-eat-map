import { Loader } from "@components/elements/loader";
import { Loading } from "@components/elements/loading";
import { useIntersectionObserver } from "@core/hook/useIntersectionObserver";
import { IStore } from "@core/interfaces/store";
import axios from "axios";
import Image from "next/image";
import { Fragment, useCallback, useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";

/**
 * 맛집 목록 페이지
 * @author 김기원
 */

const StoreListPage = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting;

  const fetchStores = async ({ pageParam = 1 }) => {
    const { data } = await axios("/api/stores?page=" + pageParam, {
      params: {
        limit: 10,
        page: pageParam,
      },
    });
    return data;
  };

  const {
    data: stores,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery("stores", fetchStores, {
    getNextPageParam: (lastPage: any) =>
      lastPage.data?.length > 0 ? lastPage.page + 1 : undefined,
  });

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();
    if (res.isError) {
      console.log(res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    let timeId: NodeJS.Timeout | undefined;
    if (isPageEnd && hasNextPage) {
      timeId = setTimeout(() => {
        fetchNext();
      }, 500);
    }
    return () => clearTimeout(timeId);
  }, [fetchNext, isPageEnd, hasNextPage]);

  return (
    <div className="px-4 md:max-w-4xl mx-auto py-8">
      <ul role="list" className="divide-y divide-gray-100">
        {!isLoading && !isError ? (
          stores?.pages?.map((page: any, i: number) => {
            return (
              <Fragment key={i}>
                {page.data.map((store: IStore, j: number) => {
                  return (
                    <li key={j} className="flex justify-between gap-x-6 py-5">
                      <div className="flex gap-x-4">
                        <Image
                          src={
                            store?.category
                              ? `/images/markers/${store?.category}.png`
                              : "/images/markers/default.png"
                          }
                          width={48}
                          height={48}
                          alt="아이콘 이미지"
                        />
                        <div className="">
                          <div className="text-sm font-semibold leading-6 text-gray-900">
                            {store?.name}
                          </div>
                          <div className="mt-1 text-xs font-semibold truncate leading-5 text-gray-500">
                            {store?.name}
                          </div>
                        </div>
                      </div>
                      <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <div className="text-sm font-semibold leading-6 text-gray-900">
                          {store?.address}
                        </div>
                        <div className="mt-1 text-xs font-semibold truncate leading-5 text-gray-500">
                          {store?.phone || "번호 없음"} |{" "}
                          {store?.foodCertifyName || "식품인증구분 없음"} |{" "}
                          {store?.category || "업태정보 없음"}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </Fragment>
            );
          })
        ) : isLoading ? (
          <Loading />
        ) : isError ? (
          <div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">
            다시 시도해주세요
          </div>
        ) : null}
      </ul>
      {/* <button type="button" onClick={() => fetchNextPage()}>
        next page
      </button> */}
      {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
      <div className="w-full touch-none h-10 mb-10" ref={ref} />
    </div>
  );
};
export default StoreListPage;
