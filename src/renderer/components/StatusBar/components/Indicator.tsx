import React, { Component } from "react";

const initialState = {
  blinkingInterval: undefined,
  isBlinking: false,
  isLit: false,
  litColor: "#FEFDFE",
  unlitColor: "#000"
};

interface IndicatorProps {
  isBlinking?: boolean;
  isLit?: boolean;
}

interface IndicatorState {
  blinkingInterval: any;
  isBlinking: boolean;
  isLit: boolean;
  litColor: string;
  unlitColor: string;
  timerID?: any;
}

class Indicator extends Component<IndicatorProps, IndicatorState> {
  // state: State = initialState;
  constructor(props: IndicatorProps) {
    super(props);
    this.state = { ...initialState, ...props };
  }

  public componentDidMount() {
    if (this.state.isBlinking) {
      this.setState({ timerID: setInterval(() => this.toggle(), 200) });
    }
  }

  public componentWillReceiveProps(nextProps) {
    this.setState({ ...nextProps }, () => {
      if (this.state.isBlinking && !this.state.blinkingInterval) {
        const blinkingInterval = setInterval(() => this.toggle(), 200);
        this.setState({ blinkingInterval });
      } else if (!this.state.isBlinking && this.state.blinkingInterval) {
        clearInterval(this.state.blinkingInterval);
        this.setState({ blinkingInterval: undefined });
      }
    });
  }

  public toggle() {
    this.setState({ isLit: !this.state.isLit });
  }

  public render() {
    return (
      <svg viewBox="0 0 200 200" width="15px" height="15px">
        <circle
          cx="100"
          cy="100"
          r="100"
          fill={this.state.isLit ? this.state.litColor : this.state.unlitColor}
          stroke="#000"
        />
      </svg>
    );
  }
}

export default Indicator;
