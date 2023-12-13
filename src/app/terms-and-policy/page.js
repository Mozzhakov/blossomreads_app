"use client";
import { SidebarContainer } from "@/components/SidebarContainer";
import styles from "../../scss/terms.module.scss";
export default function TermsPolicy() {
  return (
    <SidebarContainer>
      {" "}
      <section className={styles["page-section"]}>
        <div className={styles.container}>
          <h1 className={styles["page-title"]}>Terms and Conditions</h1>
          <p className={styles["terms-text"]}>Last Updated: 04.12.2023</p>
          <p className={styles["terms-title"]}>1. Introduction</p>
          <p className={styles["terms-text"]}>
            Welcome to the Stastiem App. These Terms and Conditions govern your
            use of our App and services. By accessing or using our App, you
            agree to be bound by these terms.
          </p>
          <p className={styles["terms-title"]}>2. Use of App</p>
          <p className={styles["terms-text"]}>
            a. The Stastiem App is a service allowing customers to review and
            edit personalized storybook orders. <br />
            b. You agree to use this App solely for lawful purposes, in
            compliance with all applicable laws.
          </p>
          <p className={styles["terms-title"]}>3. User Accounts</p>
          <p className={styles["terms-text"]}>
            a. Access to certain functionalities of the App requires creating a
            user account.
            <br /> b. You are responsible for maintaining the confidentiality of
            your account information and for all activities under your account.
          </p>
          <p className={styles["terms-title"]}>
            4. Intellectual Property Rights
          </p>
          <p className={styles["terms-text"]}>
            a. All content on this App, including text, graphics, logos, and
            software, is the property of Stastiem or its content suppliers and
            protected by intellectual property laws.
            <br /> b. You may not reproduce, distribute, modify, or create
            derivative works of any content without explicit permission.
          </p>
          <p className={styles["terms-title"]}>5. Privacy and Personal Data</p>
          <p className={styles["terms-text"]}>
            We are committed to protecting your privacy. Please refer to our
            Privacy Policy for information on how we collect, use, and disclose
            personal data.
          </p>
          <p className={styles["terms-title"]}>6. Limitation of Liability</p>
          <p className={styles["terms-text"]}>
            Stastiem is not liable for any direct, indirect, incidental,
            special, or consequential damages arising from your use of the App.
          </p>
          <p className={styles["terms-title"]}>7. Amendments</p>
          <p className={styles["terms-text"]}>
            We reserve the right to modify these terms at any time. Your
            continued use of the App after any changes constitutes your
            acceptance of the new terms.
          </p>
          <p className={styles["terms-title"]}>8. Governing Law</p>
          <p className={styles["terms-text"]}>
            These terms shall be governed by and construed in accordance with
            the laws of the jurisdiction where Stastiem is based, without regard
            to its conflict of law provisions.
          </p>
          <p className={styles["terms-title"]}>9. Contact Information</p>
          <p className={styles["terms-text"]} style={{ marginBottom: "30px" }}>
            For any questions or concerns regarding these terms, please contact
            us at support@stastiem.com.
          </p>
          <h1 className={styles["page-title"]}>Privacy Policy</h1>
          <p className={styles["terms-text"]}>Last Updated: 04.12.2023</p>
          <p className={styles["terms-text"]}>
            This Privacy Policy outlines how Stastiem collects, uses, and
            discloses information through the Stastiem App.
          </p>
          <p className={styles["terms-text"]}>
            <span className={styles["terms-title"]}>
              Information Collection:{" "}
            </span>
            We collect information you provide directly to us, such as when you
            create an account, edit a book order, or communicate with us.
          </p>
          <p className={styles["terms-text"]}>
            <span className={styles["terms-title"]}>Use of Information: </span>
            The information we collect is used to provide, maintain, and improve
            our services and to communicate with you.
          </p>
          <p className={styles["terms-text"]}>
            <span className={styles["terms-title"]}>
              Sharing of Information:{" "}
            </span>
            We do not share personal information with third parties except as
            necessary to fulfill your requests or as required by law.
          </p>
          <p className={styles["terms-text"]}>
            <span className={styles["terms-title"]}>Data Security: </span>
            We take reasonable measures to protect your information from
            unauthorized access, use, or disclosure.
          </p>
          <p className={styles["terms-text"]}>
            <span className={styles["terms-title"]}>Your Rights: </span>
            You have the right to access, correct, or delete your personal
            information. Contact us at support@stastiem.com for assistance.
          </p>
          <p className={styles["terms-text"]}>
            <span className={styles["terms-title"]}>
              Changes to this Policy:{" "}
            </span>
            We may update this policy from time to time. We will notify you of
            any changes by posting the new policy on this page.
          </p>
        </div>
      </section>
    </SidebarContainer>
  );
}
