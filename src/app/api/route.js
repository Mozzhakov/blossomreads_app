import { auth } from "@/firebase/Firebase";

export default VerifyEmail = async (req, res) => {
  const { oobCode } = req.query;

  try {
    // Verify the email action code
    const email = await verifySignInEmailLink(auth, oobCode);
    // The email is verified, sign the user in
    await signInWithEmailLink(auth, email, oobCode);
    res.status(200).json({ message: "Sign-in successful" });
  } catch (error) {
    console.error("Error verifying email action code:", error);
    res.status(400).json({ message: "Error verifying email action code" });
  }
};
