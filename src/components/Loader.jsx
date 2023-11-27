import { Puff } from "react-loader-spinner";
export const Loader = () => {
  return (
    <div
      style={{
        height: "30%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Puff
        height="80"
        width="80"
        radius={1}
        color="#f0623d"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};
