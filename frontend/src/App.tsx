import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LinkCreationModal } from "./components/link/link-creation-modal";
import { TopBar } from "./components/ui/layout/topbar";
import { useFetchAllLinksQuery } from "./redux/apis/LinkApi";

function App() {
  const { data: links, isLoading, isError } = useFetchAllLinksQuery();
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading links.</div>;
  }

  return (
    <div className="flex min-h-svh flex-col ">
      <TopBar />
      <div className="max-w-4xl mx-auto w-full p-4">
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <text className="text-2xl font-bold text-gray-800">Your Links</text>
            <Button
              className="hover:cursor-pointer"
              onClick={() => setIsCreationModalOpen(true)}
            >
              + Shorten link
            </Button>
          </div>
          <div className="mt-4"> {JSON.stringify(links)} </div>
        </div>
      </div>
      <LinkCreationModal
        isOpen={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
      />
    </div>
  );
}

export default App;
