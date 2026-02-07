// app/page.jsx or pages/index.jsx
import LoginForm from '../components/LoginForm';

export default function Home() {
  return (

    <main className="min-h-screen bg-blue-100 p-10">
      
      <img 
        src="https://www.km-legal.de/?e=48445052051930" 
        alt="This is the logo of catpuccino app" 
        className="catpuccino-logo-title w-32 h-32 mb-4" 
      />

      <LoginForm />
    </main>
  );
}
