import { TouchableHighlightProps } from 'react-native'
import { Variant } from '@Typings/theme'

export interface IButton extends TouchableHighlightProps {
  text: string
  variant: Variant
  fluid?: boolean
  ghost?: boolean
  loading?: boolean
}

export interface IText extends TouchableHighlightProps {
  variant: Variant
  ghost?: boolean
}
