import withAuth from "@/shared/HOC/withAuth";
import Hero from "@/widgets/Hero/Hero";

function Home() {
  return <Hero />;
}

export default withAuth(Home);
