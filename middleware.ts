export { default } from "next-auth/middleware";

export const config = {
  // matcher에 추가된 경로는 로그인이 필수로 들어가도록 설정된다.
  matcher: ["/users/mypage", "/stores/new", "/stores/:id/edit", "/users/likes"],
};
