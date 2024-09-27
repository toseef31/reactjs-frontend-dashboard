import React from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChatCard from '../../components/Chat/ChatCard';
import MapOne from '../../components/Maps/MapOne';
import TableOne from '../../components/Tables/TableOne';
import WidgetCard from '../GeneralComponenet/WidgetCard';

const ECommerce: React.FC = () => {

  const randomvar = 'salam';
  return (
    <>
      <WidgetCard parameter='books,ephemera,hardy_reels,users,lures,rods,penncatalogue'/>
    </>
  );
};

export default ECommerce;
