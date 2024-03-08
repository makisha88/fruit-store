import React, { useState } from 'react';
import ListView from '../UI/ListView';
import { FruitProps } from '../../types/types';
import { ALL } from '../../constants/constants';
import classes from './TabView.module.css';

type TabViewProps = {
  tabs: Array<string>;
  data: FruitProps[];
};

const TabView: React.FC<TabViewProps> = ({ tabs, data }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const showData =
    activeTab !== ALL
      ? data.filter((byStatus) => byStatus.status == activeTab)
      : data;
  return (
    <div>
      <div className={classes.TabHolder}>
        {tabs.map((tab, i) => (
          <button
            key={tab}
            className={` ${
              activeTab === tab ? classes.ActiveTab : classes.Tab
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className={classes.TabBody}>
        <ListView key={activeTab} items={showData} />
      </div>
    </div>
  );
};

export default TabView;
