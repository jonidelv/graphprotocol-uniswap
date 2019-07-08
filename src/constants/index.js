export const headerHeight = 50 // px
export const personalPage = 'https://jonidelv.me/'
export const uniswapUrl = 'https://api.thegraph.com/subgraphs/name/graphprotocol/uniswap'
export const theme = {
  palette: {
    common: {
      black: '#000',
      white: '#fff',
      grey: '#929292',
      blue: '#2196f3',
      blue2: '#8fcaf9',
    },
    background: {
      paper: '#fff',
      default: 'rgba(250, 250, 250, 1)',
    },
    primary: {
      light: '#ad77f3',
      main: '#6A10E0',
      dark: '#2b0063',
      contrastText: '#fff',
    },
    secondary: {
      light: 'rgba(102, 102, 102, 1)',
      main: 'rgba(68, 68, 68, 1)',
      dark: 'rgba(27, 27, 27, 1)',
    },
    error: {
      light: 'rgba(230, 110, 126, 1)',
      main: 'rgba(208, 86, 101, 1)',
      dark: 'rgba(150, 52, 62, 1)',
      contrastText: '#fff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: [
      '"Montserrat"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'sans-serif',
    ].join(','),
  },
}

export const logo =
  'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjJweCIgaGVpZ2h0PSIyOHB4IiB2aWV3Qm94PSIwIDAgMjIgMjgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyLjQgKDY3Mzc4KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5GaWxsIDE5PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IlN5bWJvbHMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJNZW51LS8tbm90LXNpZ25lZC1pbiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTg4LjAwMDAwMCwgLTUyLjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICA8cGF0aCBkPSJNOTcuMzMzMzAxOSw2Ny41NTU1MDMyIEM5My44OTY5NDk4LDY3LjU1NTUwMzIgOTEuMTExMTAwNiw2NC43Njk4NDI1IDkxLjExMTEwMDYsNjEuMzMzMzAxOSBDOTEuMTExMTAwNiw1Ny44OTY3NjEzIDkzLjg5Njk0OTgsNTUuMTExMTAwNiA5Ny4zMzMzMDE5LDU1LjExMTEwMDYgQzEwMC43Njk4NDMsNTUuMTExMTAwNiAxMDMuNTU1NTAzLDU3Ljg5Njc2MTMgMTAzLjU1NTUwMyw2MS4zMzMzMDE5IEMxMDMuNTU1NTAzLDY0Ljc2OTg0MjUgMTAwLjc2OTg0Myw2Ny41NTU1MDMyIDk3LjMzMzMwMTksNjcuNTU1NTAzMiBNOTcuMzMzMzAxOSw1MiBDMTAyLjQ4NzkyNCw1MiAxMDYuNjY2NjA0LDU2LjE3ODY3OTUgMTA2LjY2NjYwNCw2MS4zMzMzMDE5IEMxMDYuNjY2NjA0LDY2LjQ4NzkyNDMgMTAyLjQ4NzkyNCw3MC42NjY2MDM4IDk3LjMzMzMwMTksNzAuNjY2NjAzOCBDOTIuMTc4Njc5NSw3MC42NjY2MDM4IDg4LDY2LjQ4NzkyNDMgODgsNjEuMzMzMzAxOSBDODgsNTYuMTc4Njc5NSA5Mi4xNzg2Nzk1LDUyIDk3LjMzMzMwMTksNTIgWiBNMTA2LjIxMTA2Myw3MS4xMjIxNDQ0IEMxMDYuODE4NTc2LDcxLjcyOTY1NzUgMTA2LjgxODU3Niw3Mi43MTQ0NjIyIDEwNi4yMTEwNjMsNzMuMzIxOTc1MyBMOTkuOTg4NjczNCw3OS41NDQzNjUyIEM5OS4zODExNjAzLDgwLjE1MTg3ODMgOTguMzk2MzU1Niw4MC4xNTE4NzgzIDk3Ljc4ODg0MjUsNzkuNTQ0MzY1MiBDOTcuMTgxMzI5NCw3OC45MzY4NTIxIDk3LjE4MTMyOTQsNzcuOTUyMDQ3MyA5Ny43ODg4NDI1LDc3LjM0NDUzNDIgTDEwNC4wMTEyMzIsNzEuMTIyMTQ0NCBDMTA0LjYxODc0NSw3MC41MTQ2MzEzIDEwNS42MDM1NSw3MC41MTQ2MzEzIDEwNi4yMTEwNjMsNzEuMTIyMTQ0NCBaIE0xMDkuNzc3NzA0LDUzLjU1NTU1MDMgQzEwOS43Nzc3MDQsNTQuNDE0Nzc5NyAxMDkuMDgxMzg0LDU1LjExMTEwMDYgMTA4LjIyMjM0Myw1NS4xMTExMDA2IEMxMDcuMzYzMTEzLDU1LjExMTEwMDYgMTA2LjY2Njc5Miw1NC40MTQ3Nzk3IDEwNi42NjY3OTIsNTMuNTU1NTUwMyBDMTA2LjY2Njc5Miw1Mi42OTYzMjA5IDEwNy4zNjMxMTMsNTIgMTA4LjIyMjM0Myw1MiBDMTA5LjA4MTM4NCw1MiAxMDkuNzc3NzA0LDUyLjY5NjMyMDkgMTA5Ljc3NzcwNCw1My41NTU1NTAzIFoiIGlkPSJGaWxsLTE5Ij48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4='
