"use client";
import { useState } from "react";
import { SidebarContainer } from "@/components/SidebarContainer";
import { ArrowDown, ArrowUp } from "@/components/Icons";
import styles from "../../scss/help.module.scss";
function Help() {
  const [answersVisible, setAnswersVisible] = useState({});

  const toggleAnswer = (questionId) => {
    setAnswersVisible((prevAnswersVisible) => ({
      ...prevAnswersVisible,
      [questionId]: !prevAnswersVisible[questionId],
    }));
  };
  const faqsData = [
    {
      id: 1,
      question: "What is a Stastiem Deeply Personalized Book?",
      answer:
        "A Stastiem Deeply Personalized Book is a unique, high-quality children’s storybook, customized with stories and illustrations that reflect the child’s own life and interests. Each book is crafted to include the child as the main character, using the photos you upload.",
    },
    {
      id: 2,
      question: "How do I upload pictures for personalization?",
      answer:
        "You can easily upload pictures through our app. Just click on the ‘Upload Photos’ option in your order section and select the images that best capture the child’s personality and likeness.",
    },
    {
      id: 3,
      question: "Can I edit the stories in my book?",
      answer:
        "Yes! Once your initial story draft is ready, you will have the opportunity to review and edit the text to ensure it perfectly captures your vision. Please note, edits are only allowed within a specific timeframe before printing.",
    },
    {
      id: 4,
      question: "How do I order additional products?",
      answer:
        "Additional products like the Stastiem Audio Book, Painting, and Gift Card can be added to your order at checkout. Simply select the products you’re interested in, and they will be included with your book.",
    },
  ];
  return (
    <SidebarContainer>
      <section className={styles["help-section"]}>
        <div className={styles["container"]}>
          <h1 className={styles["help-title"]}>Need help?</h1>
          <ul className={styles["help-list"]}>
            <li className={styles["help-item"]}>
              <h5 className={styles["help-item-title"]}>
                1. Overview of Stastiem App
              </h5>
              <p className={styles["help-item-content"]}>
                Welcome to the Stastiem App, your personal portal to creating
                magical storybook experiences for the children in your life. Our
                app is designed to bring your personalized storybook orders to
                life, offering a seamless, user-friendly platform for
                customizing and managing your unique storybook creations. Here,
                you can upload images, edit story texts, preview illustrations,
                and keep track of all your orders, ensuring each book is as
                special as the child it’s made for.
              </p>
            </li>
            <li className={styles["help-item"]}>
              <h5 className={styles["help-item-title"]}>
                2. Frequently Asked Questions (FAQs)
              </h5>
              {/* <ul className={styles["help-item-list"]}> */}
              {faqsData.map((item) => (
                <div
                  key={item.id}
                  className={styles["help-item"]}
                  style={{
                    padding: "5px",
                    border: "1px solid rgba(0,0,0,0.15)",
                    borderRadius: "5px",
                  }}
                >
                  <p
                    className={styles["help-item-content"]}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    onClick={() => toggleAnswer(item.id)}
                  >
                    {item.question}
                    {answersVisible[item.id] ? (
                      <ArrowUp size={20} color={"#F0623d"} />
                    ) : (
                      <ArrowDown size={20} color={"#000"} />
                    )}
                  </p>
                  {answersVisible[item.id] && (
                    <p className={styles["help-item-content"]}>{item.answer}</p>
                  )}
                </div>
              ))}
              {/* </ul> */}
            </li>
            <li className={styles["help-item"]}>
              <h5 className={styles["help-item-title"]}>
                5. Contact Support Need Help or Have Questions?
              </h5>
              <p className={styles["help-item-content"]}>
                Our dedicated support team is here to assist you with any
                queries or concerns. Feel free to reach out to us at
                support@stastiem.com, and we’ll ensure to provide timely and
                helpful responses to your inquiries.
              </p>
            </li>
            <li className={styles["help-item"]}>
              <h5 className={styles["help-item-title"]}>
                6. Policies and Procedures
              </h5>
              <p className={styles["help-item-content"]}>
                Understanding Our Process
              </p>
              <p className={styles["help-item-content"]}>
                From the moment you place your order to the delivery of your
                personalized book, we are committed to ensuring a smooth and
                enjoyable experience. Here’s a quick overview of our process:
              </p>
              <ul className={styles["help-item-list"]}>
                <li>
                  <p className={styles["help-item-content"]}>
                    Order and Customization: After placing your order, you’ll
                    have the opportunity to upload photos and customize your
                    stories.
                  </p>
                </li>
                <li>
                  <p className={styles["help-item-content"]}>
                    Preview and Edit: Before printing, we’ll provide a preview
                    of the stories and illustrations for your review and edits.
                  </p>
                </li>
                <li>
                  <p className={styles["help-item-content"]}>
                    Shipping and Delivery: Once finalized, your book will be
                    printed and shipped. Shipping times and costs vary based on
                    location, detailed at checkout.
                  </p>
                </li>
              </ul>
            </li>
            <li className={styles["help-item"]}>
              <h5 className={styles["help-item-title"]}> 7. Tips and Best</h5>
              <p className={styles["help-item-content"]}>
                Practices Creating the Perfect Storybook To ensure your Stastiem
                book is as magical as possible, consider the following tips:
              </p>
              <ul className={styles["help-item-list"]}>
                <li>
                  <p className={styles["help-item-content"]}>
                    Choose clear, well-lit photos where the child’s face is
                    visible.
                  </p>
                </li>
                <li>
                  <p className={styles["help-item-content"]}>
                    Think about the child’s interests and hobbies for story
                    inspiration.
                  </p>
                </li>
                <li>
                  <p className={styles["help-item-content"]}>
                    Review and edit the story text to add a personal touch.
                  </p>
                </li>
              </ul>
            </li>
            <li className={styles["help-item"]}>
              <h5 className={styles["help-item-title"]}>
                8. Feedback and Suggestions
              </h5>
              <p className={styles["help-item-content"]}>
                We Value Your Feedback
              </p>
              <p className={styles["help-item-content"]}>
                Your opinions and suggestions are vital to us. Please use the
                feedback section in our app to rate your experience (1-5 stars)
                and leave any comments or suggestions. Your input helps us
                continuously improve and deliver the best personalized storybook
                experience.
              </p>
            </li>
          </ul>
        </div>
      </section>
    </SidebarContainer>
  );
}

export default Help;
