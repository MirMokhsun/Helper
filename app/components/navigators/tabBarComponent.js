import React, { PureComponent } from 'react'
import { Keyboard } from 'react-native'
import { BottomTabBar } from 'react-navigation-tabs'

export class TabBarComponent extends PureComponent {

  constructor(props) {
    super(props)

    this.keyboardWillShow = this.keyboardWillShow.bind(this)
    this.keyboardWillHide = this.keyboardWillHide.bind(this)

    this.state = {
      isVisible: true
    }
  }

  componentDidMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow)
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide)
  }

  UNSAFE_componentWillUnmount() {
    this.keyboardWillShowSub.remove()
    this.keyboardWillHideSub.remove()
  }

  keyboardWillShow = event => {
    this.setState({
      isVisible: false
    })
  }

  keyboardWillHide = event => {
    this.setState({
      isVisible: true
    })
  }

  render() {
    const { isVisible } = this.state;
    return isVisible ?
      <BottomTabBar {...this.props} />
      :
      null
  }
}

export default TabBarComponent