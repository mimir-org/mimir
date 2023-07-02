import { ButtonHTMLAttributes, ImgHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { focus } from "compLibrary/common/focus";

export interface Sizing {
  width?: string;
  maxWidth?: string;
  minWidth?: string;
  height?: string;
  maxHeight?: string;
  minHeight?: string;
  boxSizing?: string;
}

export const sizingMixin = css<Sizing>`
  width: ${(props) => props.width};
  max-width: ${(props) => props.maxWidth};
  min-width: ${(props) => props.minWidth};
  height: ${(props) => props.height};
  max-height: ${(props) => props.maxHeight};
  min-height: ${(props) => props.minHeight};
  box-sizing: ${(props) => props.boxSizing};
`;

export type IconProps = ImgHTMLAttributes<HTMLImageElement> &
  Sizing & {
    size?: number;
  };

/**
 * A simple wrapper over the img-tag
 * Has a default width and height of 1em
 * @param size sets height and width of icon
 */
export const Icon = styled.img<IconProps>`
  display: inline-block;
  width: ${(props) => (props.size ? `${props.size}px` : "1em")};
  height: ${(props) => (props.size ? `${props.size}px` : "1em")};
  line-height: 1;
  ${sizingMixin};
`;

export type ButtonContainerProps = ButtonHTMLAttributes<HTMLButtonElement> &
  Sizing & {
    size?: number;
  };

export const ButtonContainer = styled.button<ButtonContainerProps>`
  display: inline-flex;
  user-select: none;
  justify-content: center;
  align-items: center;
  gap: 5px;
  flex-direction: "row-reverse";
  white-space: nowrap;
  text-decoration: none;
  min-width: 70px;
  height: 32px;
  width: fit-content;

  padding: 8px;
  min-width: revert;
  width: 24px;
  height: 24px;

  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;

  img,
  svg {
    max-width: 18px;
    max-height: 18px;
  }

  :hover {
    cursor: pointer;
  }

  :disabled {
    cursor: not-allowed;
  }

  ${focus};
`;
