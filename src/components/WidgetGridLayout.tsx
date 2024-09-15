
import WidgetCard from '../components/WidgetCard';
import React, { useMemo } from 'react';
import GridLayout from 'react-grid-layout';
import '../Gridstyles.css'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { layoutAtoms, layoutSelectorFamily } from '../atoms';
import { filteredWidgetsState, widgetsFilterState } from '../atoms/filterAtom';
import { Button } from '@mui/material';

export default function WidgetGridLayout() {
  const filtered = useRecoilValue(filteredWidgetsState);
  const [layouts, setLayouts] = useRecoilState(layoutAtoms);
  const setFiltered = useSetRecoilState(widgetsFilterState);

  const [filtered1, setFiltered1] = useRecoilState(layoutSelectorFamily(filtered));
  console.log(filtered1)

  const gridItems = useMemo(() => filtered1.map((layout) => (
    <div key={layout.i} style={{ backgroundColor: 'gray' }}>
      <WidgetCard widgetId={layout.i} />
    </div>
  )), [filtered1]);

  const onLayoutChange = (newLayout: any) => {
    setFiltered1(newLayout)
  }

  return (
    <div className="App">
      <Button onClick={() => setFiltered('All')}>All</Button>
      <Button onClick={() => setFiltered('Used')}>Used</Button>
      <Button onClick={() => setFiltered('Unused')}>Unused</Button>

      <GridLayout className="optimized-grid"
        layout={filtered1}
        cols={3}
        rowHeight={200}
        autoSize={true}
        width={1200}
        onLayoutChange={onLayoutChange}
        draggableCancel='.no-drag'
      // compactType='horizontal'
      >
        {gridItems}
      </GridLayout>
    </div>
  );
}

