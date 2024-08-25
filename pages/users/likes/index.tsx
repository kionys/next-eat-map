import { Loading } from "@components/elements/loading";
import { Pagination } from "@components/elements/pagination";
import { StoreList } from "@components/templates/store-list";
import { ILike, ILikeApiResponse } from "@core/interfaces/store";
import axios from "axios";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

/**
 * 찜한 맛집 페이지
 * @author 김기원
 */
const LikesPage = () => {
  const router = useRouter();
  const { page = "1" }: any = router.query;

  const fetchLikes = async () => {
    const { data } = await axios({
      method: "GET",
      url: `/api/likes?page=${page}&limit=10`,
    });
    return data as ILikeApiResponse;
  };

  const {
    data: likes,
    isError,
    isLoading,
  } = useQuery(`likes-${page}`, fetchLikes);

  return (
    <div className="px-4 md:max-w-4xl mx-auto py-8">
      <h3 className="text-lg font-semibold">찜한 맛집</h3>
      <div className="mt-1 text-gray-500 text-sm">찜한 가게 리스트입니다.</div>
      <ul role="list" className="divide-y divide-gray-100 mt-10">
        {!isLoading && !isError ? (
          likes?.data?.map((like: ILike, i: number) => {
            return <StoreList key={i} store={like.store} i={i} />;
          })
        ) : isLoading ? (
          <Loading />
        ) : isError ? (
          <div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">
            다시 시도해주세요
          </div>
        ) : null}
      </ul>
      {likes?.totalPage && likes?.totalPage > 0 && (
        <Pagination
          pathname="/users/likes"
          total={likes?.totalPage}
          page={page}
        />
      )}
    </div>
  );
};
export default LikesPage;
