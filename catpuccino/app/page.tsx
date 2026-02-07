// app/page.jsx or pages/index.jsx
import LoginForm from '../components/LoginForm';
import Navbar from '../components/Navbar';

export default function Home() {
  return (

    <main className="min-h-screen bg-[#5C3727] flex flex-col items-center">
      <Navbar/>
    </main>
  );
}
