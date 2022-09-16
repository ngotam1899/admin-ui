const initialState = {
  sidebarShow: 'responsive',
  sidebarUnfoldable: false,
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'SHOW_SIDEBAR':
      return { ...state, ...rest }

    default:
      return state
  }
}

export default changeState
