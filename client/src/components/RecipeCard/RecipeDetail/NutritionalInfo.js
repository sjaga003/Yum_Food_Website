import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const NutritionalInfo = ({ recipe }) => {
  const [nutrientData, setNutrientData] = useState({});

  const changeSize = useMediaQuery({ query: '(max-width: 575.98px)' });
  const isMobile = useSelector((state) => state.isMobile);

  useEffect(() => {
    //Moved function into useEffect to remove ESLint dependency warning
    //Only supposed to run once on first render []
    const getNutrientData = () => {
      const totalMacro = recipe.nutrition.nutrients.reduce(
        (accumulator, current) => {
          if (
            current.name === 'Carbohydrates' ||
            current.name === 'Fat' ||
            current.name === 'Protein'
          ) {
            accumulator += current.amount;
          }
          return accumulator;
        },
        0
      );
      const macros = recipe.nutrition.nutrients.reduce(
        (accumulator, current) => {
          if (
            current.name === 'Carbohydrates' ||
            current.name === 'Fat' ||
            current.name === 'Protein'
          )
            accumulator.push({
              name: current.name,
              value: Math.floor((current.amount / totalMacro) * 100),
            });
          return accumulator;
        },
        []
      );

      const vitamins = recipe.nutrition.nutrients
        .reduce((accumulator, current) => {
          if (current.name.includes('Vitamin')) {
            accumulator.push({
              name: current.title,
              value: current.percentOfDailyNeeds,
            });
          }
          return accumulator;
        }, [])
        .filter(
          (el) =>
            !(
              el.name === 'Vitamin B3' ||
              el.name === 'Vitamin B2' ||
              el.name === 'Vitamin B1' ||
              el.name === 'Vitamin B5'
            )
        );

      const minerals = recipe.nutrition.nutrients.reduce(
        (accumulator, current) => {
          if (
            current.name === 'Phosphorus' ||
            current.name === 'Calcium' ||
            current.name === 'Iron' ||
            current.name === 'Selenium' ||
            current.name === 'Manganese' ||
            current.name === 'Copper' ||
            current.name === 'Zinc' ||
            current.name === 'Magnesium' ||
            current.name === 'Potassium'
          ) {
            accumulator.push({
              name: current.title,
              value: current.percentOfDailyNeeds,
            });
          }
          return accumulator;
        },
        []
      );

      return { macros, vitamins, minerals };
    };

    setNutrientData(getNutrientData());
  }, [recipe.nutrition.nutrients]);

  useEffect(() => {
    console.log(nutrientData);
  }, [nutrientData]);

  const COLORS = ['#5ad', '#e55', '#8a0'];
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <div
        data-testid="vitamin-chart"
        style={{
          transform: changeSize ? 'scale(0.8)' : 'unset',
          order: isMobile ? -1 : 3,
        }}
      >
        {Array.isArray(nutrientData.vitamins) || nutrientData.length ? (
          nutrientData.vitamins.length > 2 ? (
            <RadarChart
              outerRadius={90}
              width={400}
              height={250}
              data={nutrientData.vitamins}
              innerRadius={'10%'}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis
                tick={false}
                axisLine={false}
                angle={30}
                domain={[0, 100]}
              />
              <Radar
                name="Percent of Daily Needs"
                dataKey="value"
                unit="%"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Tooltip />
            </RadarChart>
          ) : (
            <BarChart width={400} height={250} data={nutrientData.vitamins}>
              <CartesianGrid />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip cursor={false} />
              <Bar
                dataKey="value"
                name="Percent of Daily Needs"
                unit="%"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </BarChart>
          )
        ) : (
          ''
        )}
      </div>
      <div
        data-testid="mineral-chart"
        style={{ transform: changeSize ? 'scale(0.8)' : 'unset' }}
      >
        {nutrientData.minerals ? (
          nutrientData.minerals.length > 2 ? (
            <RadarChart
              outerRadius={90}
              width={400}
              height={250}
              data={nutrientData.minerals}
              innerRadius={'10%'}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis
                tick={false}
                axisLine={false}
                angle={30}
                domain={[0, 100]}
              />
              <Radar
                name="Percent of Daily Needs"
                dataKey="value"
                unit="%"
                stroke="#e98a4b"
                fill="#e98a4b"
                fillOpacity={0.6}
              />
              <Tooltip />
            </RadarChart>
          ) : (
            <BarChart width={400} height={400} data={nutrientData.minerals}>
              <CartesianGrid />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip cursor={false} />
              <Bar
                dataKey="value"
                name="Percent of Daily Needs"
                unit="%"
                stroke="#e98a4b"
                fill="#e98a4b"
                fillOpacity={0.6}
              />
            </BarChart>
          )
        ) : (
          ''
        )}
      </div>
      <div
        data-testid="macros-chart"
        style={{ transform: changeSize ? 'scale(0.8)' : 'unset' }}
      >
        <PieChart width={400} height={250}>
          <Pie
            data={nutrientData.macros}
            dataKey="value"
            outerRadius={80}
            label={renderCustomizedLabel}
            labelLine={false}
            unit="%"
          >
            {nutrientData.macros &&
              nutrientData.macros.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke={COLORS[index % COLORS.length]}
                  fillOpacity={0.6}
                />
              ))}
          </Pie>
          <Tooltip formatter={(value, name) => [`${name}: ${value}%`]} />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </div>
    </>
  );
};

export default NutritionalInfo;
