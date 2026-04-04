export default function CategoryIcon({ title }: { title: string }) {
  const getIconPath = () => {
    switch (title) {
      case "SOCIAL SPOTS": 
        return "/images/Sociable/social-stamp.svg";
      case "AESTHETIC PICK": 
        return "/images/Aesthetic/aesthetic-stamp.svg";
      case "FLAVOR FAVORITES": 
        return "/images/BestFood/flavor-stamp.svg";
      case "FOCUS ZONES": 
        return "/images/Friendly/focus-stamp.svg";
      case "GOATED SERVICES": 
        return "/images/BestService/service-stamp.svg";
      case "GATEKEPT GEMS": 
        return "/images/Underrated/underrated-stamp.svg";
      default: 
        return "/images/Sociable/social-stamp.svg";
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center transition-all duration-200 group-hover:translate-y-2">
      <img 
        src={getIconPath()} 
        alt={title} 
        className="w-full h-full object-contain scale-110" 
      />
    </div>
  );
}