import Box from '@material-ui/core/Box';
const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box div={3}>
            {children}
          </Box>
        )}
      </div>
    );
}

export default TabPanel;