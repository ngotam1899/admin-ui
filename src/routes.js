import React from 'react'

const Colleges = React.lazy(() => import('./containers/College/List'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const PersonalityGroup = React.lazy(() => import('./containers/PersonalityGroup/List'))
const Test = React.lazy(() => import('./containers/Test/List'))
const Question = React.lazy(() => import('./containers/Question/List'))
const User = React.lazy(() => import('./containers/SysUser/List'))
const Major = React.lazy(() => import('./containers/Major/List'))
const Blog = React.lazy(() => import('./containers/Blog/List'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/manage/colleges', name: 'College', element: Colleges },
  { path: '/manage/blog', name: 'Blog', element: Blog },
  { path: '/manage/major', name: 'Major', element: Major },
  { path: '/manage/personalityGroups', name: 'Personality Group', element: PersonalityGroup },
  { path: '/manage/test', name: 'Test', element: Test },
  { path: '/manage/question', name: 'Question', element: Question },
  { path: '/manage/user', name: 'User', element: User },
]

export default routes
