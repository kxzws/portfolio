interface IAppProps {}

interface IAppState {
  openTab: openTab
}

type openTab = {
  isGarageOpen: boolean,
  isWinnersOpen: boolean
};

interface INavProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

interface ITabProps {
  isOpen: boolean
}

interface IGarageProps extends ITabProps {
  
}

interface IFormProps {
  handleCreateClick: (name: string, color: string) => void
  handleUpdateClick: (newName: string, newColor: string) => void
  isUpdateDisable: boolean;
}

type car = {
  name: string,
  color: string,
  id: number
};

interface ICarProps {
  key: number,
  num: number,
  name: string,
  color: string,
  handleRemoveClick: (id: number) => void
  handleSelectClick: (id: number) => void
}

interface IWinnersProps extends ITabProps {

}

export type {
  IAppProps,
  IAppState,
  openTab,
  INavProps,
  IGarageProps,
  IFormProps,
  car,
  ICarProps,
  IWinnersProps
};
