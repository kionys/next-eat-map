import { Loader } from "@components/elements/loader";
import { Loading } from "@components/elements/loading";
import { SearchFilter } from "@components/templates/search-filter";
import { StoreList } from "@components/templates/store-list";
import { useIntersectionObserver } from "@core/hook/useIntersectionObserver";
import { IStore } from "@core/interfaces/store";
import { searchState } from "atom";
import axios from "axios";
import { useRouter } from "next/router";
import { Fragment, useCallback, useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { useRecoilValue } from "recoil";

/**
 * 맛집 목록 페이지
 * @author 김기원
 */

const StoreListPage = () => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting;

  const searchValue = useRecoilValue(searchState);

  const searchParams = {
    q: searchValue?.q,
    district: searchValue?.district,
  };

  const fetchStores = async ({ pageParam = 1 }) => {
    const { data } = await axios("/api/stores?page=" + pageParam, {
      params: {
        limit: 10,
        page: pageParam,
        ...searchParams,
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
  } = useInfiniteQuery(["stores", searchParams], fetchStores, {
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
      {/* search filter */}
      <SearchFilter />
      <ul role="list" className="divide-y divide-gray-100">
        {!isLoading && !isError ? (
          stores?.pages?.map((page, i) => {
            return (
              <Fragment key={i}>
                {page.data.map((store: IStore, j: number) => {
                  return <StoreList key={j} store={store} i={j} />;
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
      {(isFetching || hasNextPage || isFetchingNextPage) && <Loader />}
      <div className="w-full touch-none h-10 mb-10" ref={ref} />
    </div>
  );
};
export default StoreListPage;
