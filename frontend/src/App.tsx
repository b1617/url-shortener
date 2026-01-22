import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LinkCreationModal } from "./components/link/link-creation-modal";
import LinkTableView from "./components/link/link-table-view";
import { TopBar } from "./components/ui/layout/topbar";

function App() {
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);

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
          <div className="mt-4">
            <LinkTableView />
          </div>
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
