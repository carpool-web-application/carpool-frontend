import styles from "./Banner.module.css";
import BannerImage from "../../Assets/ERND_Perf22Q2-MobLA_LS-P_DL-Lanita-Getting-Ready_16x9.webp";

const Banner = () => {
  return (
    <>
      <div className={styles.BannerContainer}>
        <div className={styles.textContainer}>
          <div className={styles.mainTextContainer}>
            Drive, earn, and get Paid
          </div>
          <div className={styles.ctextContainer}>
            <span>Ready to earn your way?</span>
          </div>
        </div>

        <div className={styles.bannerTextContainer}></div>
        <div className={styles.BannerImage}>
          <img src={BannerImage} alt="Description" />
        </div>
      </div>
    </>
  );
};

export default Banner;
