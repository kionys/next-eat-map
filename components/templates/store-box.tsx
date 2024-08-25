import { currentStoreState } from "atom";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineInfoCircle,
  AiOutlinePhone,
} from "react-icons/ai";
import { HiOutlineMapPin } from "react-icons/hi2";
import { useRecoilState } from "recoil";
import { Like } from "./like";

export const StoreBox = () => {
  const router = useRouter();
  const [store, setStore] = useRecoilState(currentStoreState);
  const { data } = useSession();
  return (
    <div className="fixed transition ease-in-out delay-150 inset-x-0 mx-auto bottom-20 rounded-lg shadow-lg max-w-sm md:max-w-xl z-10 w-full bg-white">
      {store && (
        <>
          <div className="p-8">
            <div className="flex justify-between items-start">
              <div className="flex gap-4 items-center">
                <Image
                  width={40}
                  height={40}
                  alt="아이콘 이미지"
                  src={
                    store.category
                      ? `/images/markers/${store.category}.png`
                      : "/images/markers/default.png"
                  }
                />
                <div>
                  <div className="font-semibold">{store.name}</div>
                  <div className="text-sm">{store.storeType}</div>
                </div>
              </div>
              <button type="button" onClick={() => setStore(null)}>
                <AiOutlineClose />
              </button>
            </div>
            <div className="flex justify-between gap-4">
              <div className="mt-4 flex gap-2 items-center col-span-3">
                <HiOutlineMapPin />
                {store.address ? store.address : "-"}
              </div>
              <Like storeId={store.id} />
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <AiOutlinePhone />
              {store.phone ? store.phone : "번호 없음"}
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <AiOutlineInfoCircle />
              {store.storeType ? store.storeType : "상호정보 없음"}
            </div>
            <div className="mt-2 flex gap-2 items-center">
              <AiOutlineCheck />
              {store.category ? store.category : "업태정보 없음"}
            </div>
          </div>
          <button
            type="button"
            onClick={() => router.push(`/stores/${store.id}`)}
            className="w-full bg-blue-700 hover:bg-blue-500 focus:bg-blue-500 py-3 text-white font-semibold rounded-b-lg"
          >
            상세보기
          </button>
        </>
      )}
    </div>
  );
};
