// "use client";
// import { auth } from "@/firebase/Firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// const [user] = useAuthState(auth);
// export async function GET(token) {
//   const url = "https://api.stastiem.com/user/orders/list";
//   //   console.log(user.accessToken);
//   const headers = {
//     accept: "application/json",
//     "access-token": token,
//   };
//   const res = await fetch(url, { headers });
//   const orders = await res.json();
//   return orders;

//   //   return Response.json({ product });
// }
