import type { GetStaticProps, InferGetStaticPropsType } from "next";

const getStaticPropsPage = ({
  number,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <p>getStaticProps</p>
      <p>{number}</p>
    </div>
  );
};
export default getStaticPropsPage;

/**
 *  getStaticProps 는
    dev(yarn dev) 모드에서 props number의 값이 새로고침 할 때마다 바뀌지만,
    production(yarn build > yarn start) 모드에서는 값이 유지된다.
    
    초기 로딩이 매우 짧다.
 */
export const getStaticProps: GetStaticProps<{
  number: number;
}> = async () => {
  const num = await fetch(
    "https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new",
  );
  const number = await num.json();
  return {
    props: { number },
    revalidate: 5 /**
        ISR 옵션(revalidate): 5초 마다 fetch를 다시 요청을 하게한다.
        (새로고침 시 값이 바뀌는 것을 볼 수 있다. / 실시간으로 바뀌는 것은 아님)
     */,
  };
};
