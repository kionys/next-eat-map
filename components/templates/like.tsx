import { IStore } from "@core/interfaces/store";
import axios from "axios";
import { useSession } from "next-auth/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

interface IPropsLike {
  storeId: number;
}

export const Like = ({ storeId }: IPropsLike) => {
  const { data: session } = useSession();

  const fetchStore = async () => {
    const { data } = await axios(`/api/stores?id=${storeId}`);
    return data as IStore;
  };

  const { data: store, refetch } = useQuery(
    `like-store-${storeId}`,
    fetchStore,
    {
      enabled: !!storeId, // id가 있는 경우(true)에만 react-query를 요청한다.
      refetchOnWindowFocus: false, // window 창 focus 될 때마다 refetch 되는 것을 막는다.(기본값은 true)
    },
  );

  // 찜하기 토글
  const onClickToggleLike = async () => {
    if (session?.user && store) {
      try {
        const like = await axios({
          method: "POST",
          url: `/api/likes`,
          data: {
            storeId: store.id,
          },
        });
        if (like.status === 201) {
          toast.success("가게를 찜했습니다.");
        } else {
          toast.warn("찜을 취소했습니다.");
        }
        refetch();
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <button type="button" onClick={onClickToggleLike} className="outline-none">
      {/* 로그인된 사용자가 좋아요를 눌렀을 때 */}
      {store?.likes?.length ? (
        <AiFillHeart className="hover:text-red-600 focus:text-red-600 text-red-500" />
      ) : (
        <AiOutlineHeart className="hover:text-red-600 focus:text-red-600" />
      )}
    </button>
  );
};
