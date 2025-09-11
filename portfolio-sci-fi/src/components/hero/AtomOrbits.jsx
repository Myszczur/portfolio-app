import SingleOrbit from "./SingleOrbit";

function AtomOrbits() {
  const orbitsData = [
    {
      radius: 6,
      speed: 10,
      color: "#00bfff",
      size: 0.15,
      rotation: [0, 0, 0],
      trailWidth: 0.05,
      trailLength: 6,
    },
    {
      radius: 5,
      speed: 8,
      color: "#FFA500",
      size: 0.2,
      rotation: [Math.PI / 3, Math.PI / 4, 0],
      trailWidth: 0.1,
      trailLength: 8,
    },
    {
      radius: 6,
      speed: 12,
      color: "lightgreen",
      size: 0.1,
      rotation: [-Math.PI / 3, Math.PI / 2, 0],
      trailWidth: 0.08,
      trailLength: 4,
    },
  ];

  return (
    <group>
      {orbitsData.map((orbitProps, index) => (
        <SingleOrbit key={index} {...orbitProps} />
      ))}
    </group>
  );
}
export default AtomOrbits;
