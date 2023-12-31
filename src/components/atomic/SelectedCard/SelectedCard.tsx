import React from 'react'
import styled, { css, useTheme } from 'styled-components/native'

import { hexToHsl } from '../../../utils/color'
import { IRadioButton } from './interface'
import { IText } from '../TextButton/interface'

const Container = styled.TouchableHighlight<Omit<IRadioButton, 'text'>>`
  width: ${({ fluid }) => (fluid ? '100%' : 'auto')};
  min-height: 64px;
  border-radius: 12px;
  padding: 12px 16px;
  align-items: center;
  justify-content: center;
  margin: 4px 0;

  ${({ variant, theme, selected }) =>
    !!selected
      ? css`
          background-color: ${theme.colors[variant].main};
          border: 4px solid ${theme.colors['primary'].main};
        `
      : css`
          background-color: ${theme.colors[variant].main}66;
        `}
`

const ButtonText = styled.Text<IText>`
  font-size: 20px;
  font-family: 'Poppins-SemiBold';

  color: ${({ ghost, variant, theme }) =>
    theme.colors[variant][!ghost ? 'constrastText' : 'main']};
`

function getMinButtonUnderlayColorLightness(currentLightness: number): number {
  const decreasedLightness = Math.max(10, currentLightness - 15)
  return Math.min(currentLightness, decreasedLightness)
}

const SelectedCard: React.FC<IRadioButton> = ({ selected, text, variant, ...props }) => {
  const { colors } = useTheme()
  const { hue, saturation, lightness } = hexToHsl(colors[variant].main)
  const underlayLightness = getMinButtonUnderlayColorLightness(lightness)
  return (
    <Container
      selected={selected}
      underlayColor={`hsl(${hue} ${saturation}% ${underlayLightness}%)`}
      variant={variant}
      {...props}
    >
      <ButtonText variant={variant} {...props}>
        {text}
      </ButtonText>
    </Container>
  )
}

export default SelectedCard
