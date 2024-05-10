import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Todo | Home</title>
      </Helmet>

      <div>This is the home page</div>
    </div>
  );
}
