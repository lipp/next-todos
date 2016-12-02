import React from 'react'

export default class DebouncedInput extends React.Component {
  componentWillMount () {
    this.setState({value: this.props.value})
  }

  componentWillReceiveProps (next) {
    if (next.value !== this.props.value && !this.debounceTimer) {
      this.setState({value: next.value})
    }
  }

  componentWillUnmount () {
    clearTimeout(this.debounceTimer)
  }

  debouncedSync () {
    clearTimeout(this.debounceTimer)
    this.debounceTimer = setTimeout(() => {
      delete this.debounceTimer
      this.setState({value: this.props.value})
    }, this.props.timeout)
  }

  onChange = (e) => {
    this.setState({value: e.target.value})
    this.props.onChange(e)
    this.debouncedSync()
  }

  render () {
    return <input type='text' value={this.state.value} onChange={this.onChange} />
  }
}
