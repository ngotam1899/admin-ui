import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const PersonalityGroup = React.lazy(() => import('./containers/PersonalityGroup/List'))


const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/manage/personalityGroups', name: 'Personality Group', element: PersonalityGroup },
]

export default routes
