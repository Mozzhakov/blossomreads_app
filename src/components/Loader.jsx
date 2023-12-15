import { Oval } from "react-loader-spinner";
import styles from "../scss/loader.module.scss";
export const Loader = () => {
  return <div className={styles["running-line"]}></div>;
};

export const ImageLoader = () => {
  return (
    <div className={styles["image-loader"]}>
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
    </div>
  );
};

export const StoryModalLoader = () => {
  return <div className={styles["running-line-modal"]}></div>;
};
