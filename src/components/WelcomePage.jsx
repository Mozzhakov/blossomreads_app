import LoginForm from "./LoginForm";

export default function WelcomePage({ name }) {
  return (
    <>
      <h1>Welcome, {name}</h1>
      <p>Here will be user’s content</p>
      <LoginForm />
    </>
  );
}
