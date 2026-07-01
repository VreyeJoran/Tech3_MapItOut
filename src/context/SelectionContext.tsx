import { createContext, useContext, useState } from "react";

export type SelectedMesh =
  | "RocketLaunchPad"
  | "MainHabitat"
  | "SolarArray"
  | "PlantNursery"
  | "CommsArray"
  | null;

type SelectionContextType = {
  selected: SelectedMesh;
  select: (object: SelectedMesh) => void;
  clear: () => void;
};

const SelectionContext = createContext<SelectionContextType | null>(null);

export function SelectionProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<SelectedMesh>(null);

  return (
    <SelectionContext.Provider
      value={{
        selected,
        select: setSelected,
        clear: () => setSelected(null),
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection() {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error("useSelection must be used within a SelectionProvider");
  }
  return context;
}
