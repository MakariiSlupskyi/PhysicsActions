const Lignting = () => {
  return <>
    <ambientLight intensity={Math.PI / 2} />
    <directionalLight position={[10, 10, -5]} intensity={2} />
    <directionalLight position={[10, 10, -5]} intensity={2} />
    <pointLight position={[-10, 0, -10]} intensity={5} />
  </>
}

export default Lignting;