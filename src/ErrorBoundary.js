import React, { Component } from 'react'
import t from 'format-message'
import { FaRedoAlt } from 'react-icons/fa'
import { Button } from 'react-bootstrap'
// const rollbar = setupRollbar('ErrorBoundary')

export default class ErrorBoundary extends Component {
  state = {hasError: false, viewError: false}

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.error = error
    this.errorInfo = errorInfo
    console.error(error, errorInfo)
  }

  tryAgain = () => {
    this.setState({hasError: false})
  }

  render () {
    if (this.state.hasError) {
      return <div className='error-boundary'>
        <p>{t('Something went wrong.')}</p>
        <Button bsStyle='warning' onClick={this.tryAgain}>
          <span>{t('Try that again')}</span>{' '}<FaRedoAlt />
        </Button>
        <div>
          {!this.state.viewError ? <Button onClick={() => this.setState({viewError: true})}>
            <span>{t('View Error')}</span>
          </Button> : null}
          {this.state.viewError ? <div>
            <div>{this.error.message}</div>
          </div> : null}
        </div>
      </div>
    }

    return this.props.children
  }
}