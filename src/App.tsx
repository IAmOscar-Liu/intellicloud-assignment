import { Toaster } from "@/components/ui/toaster";
import { TableIcon } from "lucide-react";
import ClassTable from "./components/ClassTable";
import Header from "./components/Header";

function App() {
  return (
    <>
      <div className="flex h-screen flex-col">
        <Header />
        <main className="h-0 flex-grow overflow-y-auto px-8 py-6">
          <div className="mx-auto max-w-[1200px] rounded-lg border-[1px] border-border px-3 py-2 shadow-md">
            <h1 className="mb-1 ms-2 mt-2 flex items-center gap-2 text-lg font-bold text-secondary-foreground">
              <TableIcon className="size-5" />
              <span>Class List</span>
            </h1>
            <ClassTable className="px-1" />
          </div>
        </main>
      </div>
      <Toaster />
    </>
  );
}

export default App;
