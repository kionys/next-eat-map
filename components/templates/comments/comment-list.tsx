import { ICommentApiResponse } from "@core/interfaces/store";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

interface IPropsCommentList {
  comments?: ICommentApiResponse;
}
export const CommentList = ({ comments }: IPropsCommentList) => {
  const { data: session } = useSession();

  // 댓글 삭제
  const onClickDeleteComment = async (id: number) => {
    const confirm = window.confirm("해당 댓글을 삭제하시겠습니까?");
    if (confirm) {
      try {
        const result = await axios({
          method: "DELETE",
          url: `/api/comments`,
          data: {
            id: id,
          },
        });

        if (result.status === 200) {
          toast.success("댓글을 삭제했습니다.");
        } else {
          toast.error("다시 시도해주세요.");
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <div className="my-10">
      {comments?.data && comments.data.length > 0 ? (
        comments?.data.map(comment => {
          return (
            <div
              key={comment.id}
              className="flex items-center space-x-4 text-sm text-gray-500 mb-8 border-b border-gray-100 pb-8"
            >
              <div className="">
                <img
                  src={comment?.user?.image || "/images/markers/default.png"}
                  alt="프로필 이미지"
                  width={40}
                  height={40}
                  className="rounded-full bg-gray-100 h-10 w-10"
                />
              </div>
              <div className="flex flex-col space-y-1 flex-1">
                <div className="">{comment.user?.email ?? "사용자"}</div>
                <div className="text-xs">{parseDate(comment.createdAt)}</div>
                <div className="text-black mt-1 text-base">{comment.body}</div>
              </div>
              <div>
                {comment.userId === session?.user.id && (
                  <button
                    type="button"
                    className="underline text-gray-500 hover:text-gray-400"
                    onClick={() => onClickDeleteComment(comment.id)}
                  >
                    삭제
                  </button>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="p-4 border border-gray-200 rounded-md text-sm text-gray-400">
          댓글이 없습니다.
        </div>
      )}
    </div>
  );
};

const parseDate = (date: string | Date) => {
  const year = new Date(date).getFullYear().toString().padStart(2, "0");
  const month = (new Date(date).getMonth() + 1).toString().padStart(2, "0");
  const day = new Date(date).getDate().toString().padStart(2, "0");
  const hour = new Date(date).getHours().toString().padStart(2, "0");
  const minute = new Date(date).getMinutes().toString().padStart(2, "0");
  const second = new Date(date).getSeconds().toString().padStart(2, "0");
  return (
    year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
  );
};
