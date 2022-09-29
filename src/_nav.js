import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSchool,
  cilGroup,
  cilSpeedometer,
  cilBraille,
  cilCommentBubble,
  cilUser,
  cilBasketball,
  cilAddressBook,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavTitle,
    name: 'Management',
  },
  {
    component: CNavItem,
    name: 'Colleges',
    to: '/manage/colleges',
    icon: <CIcon icon={cilSchool} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Personality Groups',
    to: '/manage/personalityGroups',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Test',
    to: '/manage/test',
    icon: <CIcon icon={cilBraille} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Question',
    to: '/manage/question',
    icon: <CIcon icon={cilCommentBubble} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'System Users',
    to: '/manage/user',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Major',
    to: '/manage/major',
    icon: <CIcon icon={cilBasketball} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Blog',
    to: '/manage/blog',
    icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
  },
]

export default _nav
