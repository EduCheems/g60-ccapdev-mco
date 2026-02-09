import BestCafes from "@/components/BestCafes";
import MarqueeBand from "@/components/MarqueeBand.tsx";

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-[#D5AE85] flex flex-col"> 
      
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
      
    </div>
  );
}