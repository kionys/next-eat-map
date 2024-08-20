import { IStore } from "@core/interfaces/store";
import { GetServerSideProps } from "next";
import Image from "next/image";

/**
 * 맛집 목록 페이지
 * @author 김기원
 */
const StoreListPage = ({ stores }: { stores: IStore[] }) => {
  console.log(stores);
  return (
    <div className="px-4 md:max-w-4xl mx-auto py-8">
      <ul role="list" className="divide-y divide-gray-100">
        {stores?.map((store: IStore, i: number) => {
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
        })}
      </ul>
    </div>
  );
};
export default StoreListPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const stores = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then(res => res.json());

  return {
    props: { stores },
  };
};
