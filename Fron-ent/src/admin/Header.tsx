import { Input, Layout } from 'antd'
import React from 'react'

import styled from 'styled-components'
import LogoImage from '../assets/images/logo.svg'

const { Header } = Layout

const HeaderAdmin: React.FC = () => (
  <HeaderCustom>
    <Logo src={LogoImage} />
  </HeaderCustom>
)

const HeaderCustom = styled(Header)`
  background-color: #d70018;
  height: 64px;
  display: flex;
  align-items: center;
`

const Logo = styled.img`
  width: 64px;
  height: auto;
`
const WrapperInput = styled(Input)`
  border: none;
  border-radius: 5px;
  width: 500px;
  margin-left: 100px;
`
export default HeaderAdmin
