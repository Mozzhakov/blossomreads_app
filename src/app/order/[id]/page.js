"use client";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/Firebase";
import { SidebarContainer } from "@/components/SidebarContainer";
import { getOrders } from "@/redux/orders/orders-selectors";
import { Loader } from "@/components/Loader";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStories } from "@/redux/stories/stories-operations";
import {
  getIsStoryError,
  getStoryError,
  getIsStoryLoading,
} from "@/redux/stories/stories-selectors";
import StoryList from "@/components/StoryList";
import styles from "../../../scss/story-list.module.scss";
import PrivateRoute from "@/components/PrivateRoute";

function StoryPage({ params }) {
  const dispatch = useDispatch();
  const [stories, setStories] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [paymentLink, setPaymentLink] = useState("");
  const [user, loading] = useAuthState(auth);
  const orders = useSelector(getOrders);
  useEffect(() => {
    const initializeData = () => {
      const order = orders.find((el) => el.order_id === Number(params.id));
      if (order) {
        setCurrentOrder(order);

        if (order.stories) {
          setStories(order.stories);
        } else {
          fetchStoriesData();
        }
      }
    };

    const fetchStoriesData = async () => {
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

    initializeData();
  }, [dispatch, orders, params.id, user]);

  useEffect(() => {
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
                  {heroName + " " + bookTitle}
                </h1>
                {/* <p>
                  Use prev/next to navigate between stories or exit the editor.
                  The bottom panel lets you undo/redo actions, discard changes
                  with &#34;Cancel&#34; or save edits with&#34;Done&#34;.
                </p> */}

                <StoryList stories={stories} params={params} />
              </>
            )}
            {!isStoryLoading && !loading && stories.length === 0 && (
              <h1 className={styles["story-list-title"]}>
                Oops! No stories found for order ID {params.id}
              </h1>
            )}
            {loading && <Loader />}
          </div>
        </section>
      </PrivateRoute>
    </SidebarContainer>
  );
}

export default StoryPage;
