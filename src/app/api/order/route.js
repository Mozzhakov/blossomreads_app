// import { NextResponse } from "next/server";

// export async function GET(req, res) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const query = searchParams.get("id");
//     console.log(query);

//     const response = await fetch("https://jsonplaceholder.typicode.com/posts");
//     const data = await response.json();
//     let order = data.filter((el) => el.userId === Number(query));

//     return NextResponse.json(order);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }
