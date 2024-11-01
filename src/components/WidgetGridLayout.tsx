
//import WidgetCard from '../components/WidgetCard';
import React, { useMemo } from 'react';
import GridLayout from 'react-grid-layout';
import '../Gridstyles.css'
import { layoutSelectorFamily } from '../atoms';
import { widgetsFilter } from '../atoms/filterAtom';
import { Button } from '@mui/material';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { LayoutPropsType } from '../types';
import WidgetCard from './WidgetCard';

export default function WidgetGridLayout() {
  const setFilter = useSetAtom(widgetsFilter);
  const [layouts, setLayouts] = useAtom(layoutSelectorFamily);
  console.log(layouts)
  const gridItems = useMemo(() => layouts.map((layout) => (
    <div key={layout.i} style={{ backgroundColor: 'gray' }}>
      <WidgetCard widgetId={layout.i} />
    </div>
  )), [layouts]);

  const onLayoutChange = (newLayout: any) => {
    setLayouts(newLayout)
  }

  return (
    <div className="App">
      <Button onClick={() => setFilter('All')}>All</Button>
      <Button onClick={() => setFilter('Used')}>Used</Button>
      <Button onClick={() => setFilter('Unused')}>Unused</Button>


      <GridLayout className="optimized-grid"
        layout={layouts}
        cols={3}
        rowHeight={200}
        autoSize={true}
        width={1200}
        onLayoutChange={onLayoutChange}
        draggableCancel='.no-drag'

      >
        {gridItems}
      </GridLayout>
    </div>
  );
}

