import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      marginBottom: '1em',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: theme.palette.text.primary,
    },
    delete: {
        margin: '1ch'
    },
    root: {
        flexGrow: 1,
    },
    nav:{
        marginBottom: "1em"
    },
    brand:{
        color: "white"
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    form: {
        width: '100%',
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        marginTop: theme.spacing(3),
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    field:{
        width: '90%',
    },
    submit:{
       margin: "1ch"
    },
    listRoot:{
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    },
    forgotRoot:{
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
    },
    dashboardRoot:{
        '& > *': {
            margin: theme.spacing(2),
            width: '90%',
          },
    },
    tripListRoot: {
        width: "100%",
        "& > * + *": {
          marginTop: theme.spacing(2)
        },
        "& .MuiPagination-ul" : {
            display: "flex",
            justifyContent: "center"
        }
      },
    authPaper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    forgotForm: {
        width: '100%', 
        marginTop: theme.spacing(1),
    },
    forgotSubmit: {
        margin: theme.spacing(3, 0, 2),
    },
    typographyStyle: {
        flexGrow: 1,
        textAlign: "center",
    },
    link:{
        justifyContent: "center",
        textAlign: "center",
    },
    loginPaper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    authForm: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    authSubmit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default useStyles;