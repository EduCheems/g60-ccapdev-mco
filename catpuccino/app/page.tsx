
import LoginForm from '../components/LoginForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#5C3727] flex flex-col">

      <div className="flex-grow flex flex-col items-center justify-center py-5">
        
        <div className="flex flex-col items-center w-full max-w-sm -mt-20">
          <div>
            <img 
              src="/catpuccino-footer.svg"
              alt="catpuccino footer logo"
              className="w-100 h-auto object-contain"
            />
          </div>

          <div className="w-full">
            <LoginForm/>
          </div>
        </div>
      </div>
      

    </main>
    
  );
}
