import type { InferGetServerSidePropsType } from "next";

const getServerSidePropsPage = ({
  number,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <main>
      <p>getServerSideProps</p>
      <p>{number}</p>
    </main>
  );
};
export default getServerSidePropsPage;

/**
 *  getServerSideProps 는
    dev(yarn dev) 모드에서 props number의 값이 새로고침 할 때마다 바뀌며,
    production(yarn build > yarn start) 모드에서도 새로고침 할 때마다 number 값이 바뀐다.

    초기 로딩이 길다.
 */
export const getServerSideProps = async () => {
  const num = await fetch(
    "https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new",
  );
  const number = await num.json();
  return { props: { number } };
};
