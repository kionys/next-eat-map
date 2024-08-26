import { ICommentApiResponse } from "@core/interfaces/store";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { CommentForm } from "./comment-form";
import { CommentList } from "./comment-list";

interface IPropsComments {
  storeId: number;
}
export const Comments = ({ storeId }: IPropsComments) => {
  const { status } = useSession();
  const router = useRouter();
  const { page = "1" } = router.query;

  const fetchComments = async () => {
    const { data } = await axios({
      method: "GET",
      url: `/api/comments?storeId=${storeId}&limit=10&page=${page}`,
    });
    return data as ICommentApiResponse;
  };

  const { data: comments, refetch } = useQuery(
    `comments-${storeId}`,
    fetchComments,
  );

  return (
    <>
      <div className="md:max-w-2xl py-8 px-3 mb-20 mx-auto">
        {/* comment form */}
        {status === "authenticated" && (
          <CommentForm storeId={storeId} refetch={refetch} />
        )}
        {/* comment list */}
        <CommentList comments={comments} />
      </div>
    </>
  );
};
