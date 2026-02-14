import HeroSection from "@/components/HeroSection";
import BestCafes from "@/components/BestCafes";
import MarqueeBand from "@/components/MarqueeBand.tsx";

export default function DiscoverPage() {
  return (
    
    <div className="min-h-screen bg-[#D5AE85] flex flex-col"> 

      <HeroSection /> 

      <div id ="catpuccino-definition" className="bg-[#FEF6EA] h-[320px] w-full flex flex-col justify-center px-[140px]">
        <h2 className="text-[#855225] font-poppins font-black text-[20px] leading-tight uppercase tracking-tight">
            What's the deal with 
        </h2>
        <span className="block"></span>
        <h2 className="text-[#855225] font-poppins font-black text-[50px] leading-tight uppercase tracking-tight">
            Catpuccino? 
        </h2>
        <span className="block"></span>
        <p className="w-[475px] text-[#262626]">
          Catpuccino is your go-to platform to discover, review, and connect with cat cafes in the Philippines. Find the purr-fect spot to relax, study, or enjoy delicious drinks while meeting friendly cats, all rated on ambience, comfort, sociability, food, and service.
        </p>

      </div>

      <section className="h-[642px] bg-[#FBF3DE] py-16 px-[140px] text-center">
        {/* Header with horizontal lines */}
        <div className="pt-[25px] flex items-center justify-center gap-8 mb-12">
          <div className="h-[2px] flex-1 bg-[#855225] opacity-30"></div>
          <div>
            <p className="text-[#855225] font-poppins font-bold text-xl lowercase">Discover the</p>
            <h2 className="text-[#855225] font-poppins font-black text-5xl uppercase tracking-tighter">
              The best spots!!!
            </h2>
          </div>
          <div className="h-[2px] flex-1 bg-[#855225] opacity-30"></div>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-6 gap-6">
          {[
            { title: "SOCIAL SPOTS", desc: "Top 10 Cat cafes rated by sociability" },
            { title: "AESTHETIC PICK", desc: "Top 10 Cat cafes rated by ambience" },
            { title: "FLAVOR FAVORITES", desc: "Top 10 Cat cafes rated by food quality" },
              { title: "FOCUS ZONES", desc: "Top 10 Cat cafes rated by work-friendliness" },
              { title: "GOATED SERVICES", desc: "Top 10 Cat cafes rated by service" },
              { title: "GATEKEPT GEMS", desc: "Check out the Top 5 underrated cafes" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center group cursor-pointer">
                {/* Grey Placeholder Image */}
                <div className="w-full aspect-[3/4] bg-[#D9D9D9] mb-4 transition-transform group-hover:-translate-y-2 duration-300 shadow-sm group-hover:shadow-xl"></div>
                
                {/* Text Details */}
                <h3 className="text-[#D26500] font-poppins font-black text-sm uppercase tracking-wider mb-1">
                  {item.title}
                </h3>
                <p className="text-[#855225] font-poppins font-medium text-[10px] leading-tight opacity-80">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Centered Down Arrow at the bottom */}
          <div className="mt-16 flex justify-center">
            <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[20px] border-t-[#D26500]" />
          </div>
      </section>

      <section className="bg-[#FEF6EA]">
        <MarqueeBand text="General Munchkin's social spots" bgColor="bg-[#EE7D6C]" />
        <BestCafes 
          cardColor="bg-[#ED7364]" 
          badgeText="People Friendly"
          badgeColor="bg-[#ED7364]"
        />

        <MarqueeBand text="OPPIE GOOPEY’S AESTHETIC PICKS" bgColor="bg-[#73A659]" />
        <BestCafes 
          cardColor="bg-[#87AE73]" 
          badgeText="Aesthetic"
          badgeColor="bg-[#87AE73]" 
        />

        <MarqueeBand text="CHONKY’S FLAVOR FAVORITES" bgColor="bg-[#EC6B00]" />
        <BestCafes 
          cardColor="bg-[#FF7300]" 
          badgeText="Best Foods"
          badgeColor="bg-[#FF7300]" 
        />

        <div className="h-[400px] w-full bg-[#FCD24C]"> 

        </div>
      
        <MarqueeBand text="LIL’JIMBOB’S FOCUS ZONES" bgColor="bg-[#57928F]" />
        <BestCafes 
          cardColor="bg-[#699795]" 
          badgeText="Work-Friendly"
          badgeColor="bg-[#699795]" 
        />

        <MarqueeBand text="LARRY’S GOATED CAFE SERVICES" bgColor="bg-[#FF5995]" />
        <BestCafes 
          cardColor="bg-[#FF5995]" 
          badgeText="Best Service"
          badgeColor="bg-[#FF5995]"  
        />

        <MarqueeBand text="BURGER’S GATEKEPT GEMS" bgColor="bg-[#623D9B]" />
        <BestCafes 
          cardColor="bg-[#7454A4]" 
          badgeText="Underrated"
          badgeColor="bg-[#7454A4]" 
        />
      </section>

      <div className="h-[400px] w-full bg-[#FCD24C]"> 

      </div>
      
    </div>
  );
}  