import SponsorsShowcase from '../components/ui/SponsorsCard';

const SponsorsPage = () => {
  const sponsors = [
    {
      id: 1,
      name: "TechCorp",
      tier: "platinum",
      logo: "https://picsum.photos/200", // Add your sponsor logo path
      description: "Leading Technology Solutions", // Optional
      link: "https://techcorp.com" // Optional
    },
    {
      id: 2,
      name: "InnovateX",
      tier: "platinum",
      logo: "https://picsum.photos/200",
      description: "Innovation Partner"
    },
    {
      id: 3,
      name: "SpaceWorks",
      tier: "gold",
      logo: "https://picsum.photos/200",
      description: "Space Technology"
    },
    // Add more sponsors...
  ];

  return (
    <div className="min-h-screen backdrop-brightness-100">
      <SponsorsShowcase sponsors={sponsors} />
    </div>
  );
};

export default SponsorsPage;