import { Puff, Oval } from "react-loader-spinner";
// import { Portal } from "./Modal";
import styles from "../scss/loader.module.scss";
export const Loader = () => {
  return (
    <div className={styles["loader-overlay"]}>
      <div className={styles["loader"]}>
        <Puff
          height="80"
          width="80"
          radius={1}
          color="#f0623d"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </div>
    </div>
    // <div className={styles["loading-bar"]}>
    //   <div className={styles["progress-bar"]}></div>
    // </div>
  );
};

export const ImageLoader = () => {
  return (
    <Oval
      height={30}
      width={30}
      color="#f0623d"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#f0623d"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};
