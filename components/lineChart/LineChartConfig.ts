export const lineChartOption = (title: string) => {
  const options = {
    plugins: {
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        min: 0,
      },
      x: {
        ticks: {
          stepSize: 1,
        },
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
  };

  return options;
};
