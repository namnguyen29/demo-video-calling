import { Component, ErrorInfo, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  public static getDerivedStateFromError(): State {
    return {
      hasError: true
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Component Uncaught error:', error, errorInfo);
    // log error service here
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div>
          <p>
            Something wrong, We should use error boundary to show error instead of the crash part
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
