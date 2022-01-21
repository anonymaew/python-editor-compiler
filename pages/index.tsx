import type { NextPage } from "next";
import Window from "../components/Window";

const Home: NextPage = () => {
  return (
    <div>
      <Window
        precode={
          "def fibo(n):\n  return 1 if n==0 or n==1 else fibo(n-1)+fibo(n-2)\n\nprint(fibo(10))"
        }
      />
    </div>
  );
};

export default Home;
