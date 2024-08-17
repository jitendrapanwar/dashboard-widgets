
import WidgetCard from '../components/WidgetCard';
import React, { useMemo } from 'react';
import GridLayout from 'react-grid-layout';
import '../Gridstyles.css'
import { useRecoilState } from 'recoil';
import { widgetAtoms, layoutAtoms } from '../atoms';

export default function WidgetGridLayout() {
  const [widgets, setWidgets] = useRecoilState(widgetAtoms);
  const [layouts, setLayouts] = useRecoilState(layoutAtoms);

  const layoutConfig = widgets.map(widget => widget.layout)
  console.log(layouts)
  const gridItems = useMemo(() => widgets.map((widget) => (
    <div key={widget.layout.i} style={{ backgroundColor: 'gray' }}>
      <WidgetCard title={widget.widgetTitle} layoutProps={widget.layout} id={widget.widgetId} />
    </div>
  )), [widgets]);

  const onLayoutChange = (newLayout: any) => {
    setLayouts(newLayout)
    const neww = widgets?.map((widget, index) => {
      if (widget.widgetId === newLayout[index]?.i) {
        return { ...widget, layout: newLayout[index] }
      } else {
        return widget;
      }
    })
    setWidgets(neww);
  }

  return (
    <div className="App">
      <GridLayout className="optimized-grid"
        layout={layoutConfig}
        cols={12}
        rowHeight={30}
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

