import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const PersonalityGroup = React.lazy(() => import('./containers/PersonalityGroup/List'))
const Test = React.lazy(() => import('./containers/Test/List'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/manage/personalityGroups', name: 'Personality Group', element: PersonalityGroup },
  { path: '/manage/test', name: 'Test', element: Test },
]

export default routes
