import Link from "next/link";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  return (
    <div>
      {/* push: 히스토리 쌓인다.(뒤로가기 누르면 이전페이지로 간다) */}
      <button
        type="button"
        onClick={() => {
          router.push({
            pathname: "/[slug]",
            query: { slug: "push" },
          });
        }}
      >
        Router Push
      </button>
      <br />

      {/* replace: 히스토리 안쌓인다.(뒤로가기 누르면 전전페이지로 간다.) */}
      <button
        type="button"
        onClick={() => {
          router.replace({
            pathname: "/[slug]",
            query: { slug: "push" },
          });
        }}
      >
        Router Replace
      </button>
      <br />

      {/* reload: 새로고침. */}
      <button
        type="button"
        onClick={() => {
          router.reload();
        }}
      >
        Router Reload
      </button>
      <br />

      {/* Link: 페이지가 깜빡이지 않으며, 히스토리는 쌓인다. */}
      <Link href={"/hello"}>HELLO</Link>
      <br />
      <Link href={"/bye"}>BYE</Link>
    </div>
  );
};
export default Page;
