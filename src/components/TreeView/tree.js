import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
// import MailIcon from '@material-ui/icons/Mail';
// import DeleteIcon from '@material-ui/icons/Delete';
import Label from '@material-ui/icons/Label';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
// import InfoIcon from '@material-ui/icons/Info';
import ForumIcon from '@material-ui/icons/Forum';
// import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
// import toolbar from '../../components/Nav/Toolbar/Toolbar';
import { NavLink } from 'react-router-dom';

const useTreeItemStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.secondary,
    '&:focus > $content': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      color: 'var(--tree-view-color)',
    },
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
    fontSize: '15px'
  },
}));


function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const { tree, labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;


  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <LabelIcon color="inherit" className={classes.labelIcon} />
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
  root: {
    height: 500,
    flexGrow: 1,
    maxWidth: '100%',
  },
});

export default function GmailTreeView(props) {
  const classes = useStyles();

  const { aws, kv } = props.tree;

  return (
    <TreeView
      className={classes.root}
      defaultExpanded={['1', '6']}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
    >

      {/* Rendering The AWS Credential List */}
      <StyledTreeItem nodeId="1" labelText="AWS" labelIcon={Label}>
        {aws && aws.length > 0 && (
          aws.map((acc, index) => (
            <StyledTreeItem
              nodeId={(Math.random() * 100).toString()}
              labelText={acc.name}
              labelIcon={SupervisorAccountIcon}
              labelInfo="90"
              color="#1a73e8"
              bgColor="#e8f0fe"
              key={index}
            >
              {acc.sub.length === 0 ? null : acc.sub.map((category, index) => {
                return (
                  <NavLink to={`/dashboard/aws/${acc.name}`}>
                    <StyledTreeItem
                      nodeId={(Math.random() * 1000).toString()}
                      labelText={category.roleName}
                      labelIcon={SupervisorAccountIcon}
                      labelInfo={category.generatedCreds.length.toString()}
                      color="#1a73e8"
                      bgColor="#e8f0fe"
                      key={index}
                    />
                  </NavLink>
                )
              })}
            </StyledTreeItem>
          ))
        )}

      </StyledTreeItem>


      <StyledTreeItem nodeId="2" labelText="Credentials" labelIcon={Label} >
        {kv && kv.length > 0 && (
          kv.map((acc, index) => (
            <StyledTreeItem
              nodeId={(Math.random() * 100).toString()}
              labelText={acc.name}
              labelIcon={SupervisorAccountIcon}
              color="#1a73e8"
              bgColor="#e8f0fe"
              key={index}
            >
              {acc.sub.length === 0 ? null : acc.sub.map((category, index) => {
                return (
                  <NavLink to={`/dashboard/kv/${acc.name}`}>
                    <StyledTreeItem
                      nodeId={(Math.random() * 1000).toString()}
                      labelText={category.name}
                      labelIcon={SupervisorAccountIcon}
                      labelInfo={category.creds.length.toString()}
                      color="#1a73e8"
                      bgColor="#e8f0fe"
                      key={index}
                    />
                  </NavLink>
                )
              })}
            </StyledTreeItem>
          ))
        )}

      </StyledTreeItem>
    </TreeView>
  );
}
