import { Component, ErrorInfo, memo } from 'react'
import ErrorPage from './ErrorPage'
import { IBoundaryProps, IErrboundaryState } from './model'

export class ErrorBoundary extends Component<
  IBoundaryProps,
  IErrboundaryState
> {
  public constructor(properties: IBoundaryProps) {
    super(properties)
    this.state = { hasError: false }
  }

  public static getDerivedStateFromError(): IErrboundaryState {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState(prev =>
      Object.assign(prev, {
        error: { message: error.message, errorStack: errorInfo.componentStack },
      })
    )
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    const { hasError } = this.state
    const { children } = this.props

    if (hasError) {
      return <ErrorPage error={this.state.error} />
    }

    return children
  }
}

export default memo(ErrorBoundary)
