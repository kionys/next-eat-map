import { useRouter } from "next/router";

/**
 * 맛집 수정 페이지
 * @author 김기원
 */
const StoreEditPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return <>Store Edit Page: {id}</>;
};
export default StoreEditPage;
