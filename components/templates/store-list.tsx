import { IStore } from "@core/interfaces/store";
import Image from "next/image";
import { useRouter } from "next/router";

interface IPropsStoreList {
  store?: IStore;
  i: number;
}

export const StoreList = ({ store, i }: IPropsStoreList) => {
  const router = useRouter();
  return (
    <>
      <li
        key={i}
        className="flex justify-between gap-x-6 py-5 cursor-pointer hover:bg-gray-50"
        onClick={() => router.push(`/stores/${store?.id}`)}
      >
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
    </>
  );
};
