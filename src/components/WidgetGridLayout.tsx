
import WidgetCard from '../components/WidgetCard';
import React, { useMemo } from 'react';
import GridLayout from 'react-grid-layout';
import '../Gridstyles.css'
import { useRecoilState } from 'recoil';
import { layoutAtoms } from '../atoms';

export default function WidgetGridLayout() {
  const [layouts, setLayouts] = useRecoilState(layoutAtoms);

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
      <GridLayout className="optimized-grid"
        layout={layouts}
        cols={3}
        rowHeight={200}
        autoSize={true}
        width={1200}
        onLayoutChange={onLayoutChange}
        draggableCancel='.no-drag'
        compactType='horizontal'
      >
        {gridItems}
      </GridLayout>
    </div>
  );
}

