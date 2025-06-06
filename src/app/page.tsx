import GetStartedButton from "@/components/get-started-button"


const Home = () => {
  return (
    <div className="flex items-center justify-center h-dvh">
      <div className="flex justify-center gap-8 flex-col items-center">
        <h1 className="text-6xl font-bold">Little Auth</h1>
        <GetStartedButton />
      </div>
    </div>
  )
}

export default Home