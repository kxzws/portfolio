import React from "react";
import "./App.scss";
import Garage from "./components/Garage";
import Winners from "./components/Winners";
import Nav from "./components/Nav";
import { IAppProps, IAppState } from "./components/utils/interfaces";

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      openTab: {
        isGarageOpen: true,
        isWinnersOpen: false,
      }
    };

    this.handleTabClick = this.handleTabClick.bind(this);
  }

  handleTabClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    const idName = e.currentTarget.id;
    switch (idName) {
      case 'garage':
        this.setState({
          openTab: {
            isGarageOpen: true,
            isWinnersOpen: false,
          }
        });
        break;
      case 'winners':
        this.setState({
          openTab: {
            isGarageOpen: false,
            isWinnersOpen: true,
          }
        });
        break;
    }
  }

  render() {
    return (
      <>
        <Nav onClick={this.handleTabClick} />
        <Garage
          isOpen={this.state.openTab.isGarageOpen}
        />
        <Winners
          isOpen={this.state.openTab.isWinnersOpen}
        />
      </>
    );
  }
}

export default App;
