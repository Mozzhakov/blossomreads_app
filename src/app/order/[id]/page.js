"use client";
import { Loader } from "@/components/Loader";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStories } from "@/redux/stories/stories-operations";
import {
  getIsStoryError,
  getStoryError,
  getIsStoryLoading,
} from "@/redux/stories/stories-selectors";
import { useNotify } from "@/hooks/useNotify";
import StoryList from "@/components/StoryList";
import styles from "../../../scss/story-list.module.scss";
import PrivateRoute from "@/components/PrivateRoute";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/Firebase";
import { SidebarContainer } from "@/components/SidebarContainer";
import { getOrders } from "@/redux/orders/orders-selectors";
import Link from "next/link";

function StoryPage({ params }) {
  const { showFailure } = useNotify();
  const dispatch = useDispatch();
  const [stories, setStories] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [paymentLink, setPaymentLink] = useState("");
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.stsTokenManager.expirationTime > Date.now()) {
          const fetchedStories = await dispatch(
            fetchStories({ id: Number(params.id), token: user.accessToken })
          );
          setStories(fetchedStories.payload);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, params.id, user]);

  const orders = useSelector(getOrders);

  useEffect(() => {
    setCurrentOrder(
      orders.find((el) => {
        return el.order_id === Number(params.id);
      })
    );
    if (currentOrder && user && currentOrder.status === "created") {
      const generatePaymentLink = async (orderData) => {
        const paymentPayload = {
          products: ["book"],
          customer_email: user.email,
          client_reference_id: orderData.stripe_client_reference_id,
          language: orderData.book_language,
          testing: false,
          book_quantity: 1,
          painting_quantity: 1,
        };
        try {
          const response = await fetch(
            "https://api.stastiem.com/stripe/stripe-payment-url",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(paymentPayload),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch payment link");
          }
          const data = await response.json();
          setPaymentLink(data.payment_url);
          // console.log(data.payment_url);
        } catch (error) {
          console.error("Error fetching payment link:", error);
        }
      };
      generatePaymentLink(currentOrder);
    }
  }, [user]);

  const isStoryError = useSelector(getIsStoryError);
  const storyErrorMessage = useSelector(getStoryError);
  const isStoryLoading = useSelector(getIsStoryLoading);

  useEffect(() => {
    if (isStoryError) {
      showFailure(storyErrorMessage);
    }
  }, [isStoryError, showFailure, storyErrorMessage]);

  const cover =
    stories &&
    stories.find((el) => {
      return el.is_cover === true;
    });

  const heroName = cover && cover.story_title.split(" ")[0];
  const bookTitle = cover && cover.story_title.split(" ")[1];

  return (
    <SidebarContainer>
      <PrivateRoute>
        <section className={styles["story-list-section"]}>
          <div className={styles.container}>
            {currentOrder && currentOrder.status === "created" && (
              <h2
                style={{
                  textAlign: "center",
                  fontStyle: "italic",
                  fontWeight: "400",
                  marginBottom: "40px",
                }}
              >
                This order hasn&#39;t been paid for yet.{" "}
                <Link href={paymentLink} style={{ color: "#f0623d" }}>
                  Pay now
                </Link>
              </h2>
            )}
            {stories && stories.length !== 0 && (
              <>
                <h1 className={styles["story-list-title"]}>
                  <span className={styles["story-list-title-part"]}>
                    {cover && heroName}
                  </span>{" "}
                  {cover && bookTitle}
                </h1>
                <StoryList stories={stories} params={params} />
              </>
            )}
            {!isStoryLoading && !loading && stories.length === 0 && (
              <h1 className={styles["story-list-title"]}>
                Oops! No stories found for order ID {params.id}
              </h1>
            )}

            {isStoryLoading && <Loader />}
            {loading && <Loader />}
          </div>
        </section>
      </PrivateRoute>
    </SidebarContainer>
  );
}

export default StoryPage;
