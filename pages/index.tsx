import type { NextPage } from "next";
import Window from "../components/Window";

const Home: NextPage = () => {
  return (
    <div>
      <Window
        precode={
          "l = [1 if i == 0 or i == 1 else 0 for i in range(1000)]\n\ndef fibo(n):\n  if l[n] == 0:\n    l[n] = fibo(n-1) + fibo(n-2)\n  return l[n]\n\nn = input('Type the order number to find the fibonacci number:')\nif not n.isnumeric():\n  print(n, 'is not a number!')\nelse:\n  n = int(n)\n  if not 0 < n <= 1000:\n    print(n, 'is out of range (between 1 to 1000)')\n  else:\n    print('The', n, 'fibonacci number is', fibo(n-1))"
        }
      />
    </div>
  );
};

export default Home;
