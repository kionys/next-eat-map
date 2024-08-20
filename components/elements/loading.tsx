export const Loading = () => {
  return (
    <>
      <div className="w-full h-20 animate-pulse bg-gray-100 rounded-md" />
      {[...Array(10)].map((e, i) => {
        return (
          <div
            key={i}
            className="w-full h-20 animate-pulse bg-gray-100 rounded-md mt-2"
          />
        );
      })}
    </>
  );
};
