import { Loading } from "@components/elements/loading";
import { Pagination } from "@components/elements/pagination";
import { IStore, IStoreApiResponse } from "@core/interfaces/store";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

/**
 * 맛집 목록 페이지
 * @author 김기원
 */

// { stores }: { stores: IStore[] }
const StoreListPage = () => {
  const router = useRouter();
  const { page = "1" }: any = router.query;

  const {
    isLoading,
    isError,
    data: stores,
  } = useQuery(`stores-${page}`, async () => {
    const { data } = await axios({
      method: "GET",
      url: `/api/stores?page=${page}`,
    });
    return data as IStoreApiResponse;
  });

  return (
    <div className="px-4 md:max-w-4xl mx-auto py-8">
      <ul role="list" className="divide-y divide-gray-100">
        {isError && (
          <div className="w-full h-screen mx-auto pt-[10%] text-red-500 text-center font-semibold">
            다시 시도해주세요
          </div>
        )}
        {isLoading ? (
          <Loading />
        ) : (
          stores?.data?.map((store: IStore, i: number) => {
            return (
              <li key={i} className="flex justify-between gap-x-6 py-5">
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
                    {store?.foodCertifyName || "상호정보 없음"} |{" "}
                    {store?.category || "업태정보 없음"}
                  </div>
                </div>
              </li>
            );
          })
        )}
      </ul>
      {stores?.totalPage && (
        <Pagination total={stores?.totalPage} page={page} />
      )}
    </div>
  );
};
export default StoreListPage;

// export const getServerSideProps: GetServerSideProps = async () => {
//   const url = `${process.env.NEXT_PUBLIC_API_URL}/api/stores`;
//   const stores = await axios({ method: "GET", url: url });

//   return {
//     props: { stores: stores.data },
//   };
// };
