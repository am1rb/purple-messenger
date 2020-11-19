import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Box from "@material-ui/core/Box";
import TabPanel from "@material-ui/lab/TabPanel";
import TabContext from "@material-ui/lab/TabContext";
import {
  loadConversationList,
  unloadConversationList,
} from "@purple-messenger/core";
import RequestTab from "features/request/components/RequestTab";
import RequestList from "features/request/components/RequestList";
import ConversationList from "features/conversation/components/ConversationList";
import ConversationTab from "features/conversation/components/ConversationTab";
import NewConversationButton from "../NewConversationButton";
import useStyles from "./SidePanel.styles";

export interface SidePanelProps {
  className?: string;
}

enum TabValue {
  Conversations = "conversations",
  Requests = "requests",
}

function SidePanel({ className }: SidePanelProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = useState(TabValue.Conversations);

  const handleChange = useCallback(
    (event: React.ChangeEvent<{}>, newValue: TabValue) => setValue(newValue),
    []
  );

  useEffect(() => {
    dispatch(loadConversationList());
    return () => {
      dispatch(unloadConversationList());
    };
  }, [dispatch]);

  return (
    <Box className={className}>
      <Box p={1}>
        <NewConversationButton />
      </Box>
      <TabContext value={value}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          className={classes.tabs}
        >
          <ConversationTab
            label="Conversations"
            value={TabValue.Conversations}
            className={classes.tab}
          />
          <RequestTab
            label="Requests"
            value={TabValue.Requests}
            className={classes.tab}
          />
        </Tabs>
        <TabPanel value={TabValue.Conversations} className={classes.tabPanel}>
          <ConversationList />
        </TabPanel>
        <TabPanel value={TabValue.Requests} className={classes.tabPanel}>
          <RequestList />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default SidePanel;
