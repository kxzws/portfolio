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

interface IWinnersProps extends ITabProps {

}

export type {
  IAppProps,
  IAppState,
  openTab,
  INavProps,
  IGarageProps,
  IWinnersProps
};
