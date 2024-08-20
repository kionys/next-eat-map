import { useRouter } from "next/router";

/**
 * 맛집 상세 페이지
 * @author 김기원
 */
const StoreDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return <>Store Detail: {id}</>;
};
export default StoreDetailPage;
