import React, { useState } from 'react';
import { weatherData } from '../data/weatherData';

export default function WeatherMonitoring() {
  const [activeRange, setActiveRange] = useState('7D');
  const { current, trend7Days } = weatherData;

  return (
    <div className="flex flex-col w-full pb-16 space-y-space-xl">
      {/* Top Banner / Weather Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
        {/* Main Current Weather Card (2 cols) */}
        <div className="lg:col-span-2 bg-surface-container-low rounded-xl p-space-lg flex flex-col justify-between relative overflow-hidden shadow-sm border border-surface-container-high/60">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-fixed/20 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>

          <div className="flex justify-between items-start mb-space-lg relative z-10">
            <div>
              <span className="text-label-sm font-label-sm tracking-wider uppercase text-on-surface-variant">
                Live Telemetry • Station Alpha
              </span>
              <h2 className="text-headline-lg font-headline-lg text-on-surface mt-space-xs">
                {current.condition}
              </h2>
            </div>
            <div className="bg-primary text-on-primary p-space-md rounded-xl flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[32px] fill-1">wb_sunny</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-space-md my-space-md relative z-10">
            <div>
              <span className="text-body-sm font-body-sm text-on-surface-variant block">Temperature</span>
              <span className="text-headline-md font-headline-md text-on-surface">
                {current.temperature}{current.tempUnit}
              </span>
            </div>
            <div>
              <span className="text-body-sm font-body-sm text-on-surface-variant block">Humidity</span>
              <span className="text-headline-md font-headline-md text-on-surface">
                {current.humidity}{current.humidityUnit}
              </span>
            </div>
            <div>
              <span className="text-body-sm font-body-sm text-on-surface-variant block">Wind Speed</span>
              <span className="text-headline-md font-headline-md text-on-surface">
                {current.windSpeed} <span className="text-body-md font-body-md text-on-surface-variant">{current.windDirection}</span>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-space-md border-t border-surface-container-high relative z-10 text-label-md font-label-md text-on-surface-variant">
            <span>Sensor Status: {current.sensorStatus}</span>
            <span className="text-primary font-bold flex items-center gap-space-xs">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Synchronized {current.lastSync}
            </span>
          </div>
        </div>

        {/* Solar Irradiance Card */}
        <div className="bg-surface-container-low rounded-xl p-space-lg flex flex-col justify-between shadow-sm border border-surface-container-high/60">
          <div>
            <div className="flex justify-between items-center mb-space-md">
              <span className="text-label-sm font-label-sm tracking-wider uppercase text-on-surface-variant">
                Solar Irradiance
              </span>
              <span className="material-symbols-outlined text-tertiary">flare</span>
            </div>
            <div className="text-[36px] font-headline-lg text-on-surface leading-none mb-space-xs">
              {current.irradiance} <span className="text-body-lg font-body-lg text-on-surface-variant">{current.irradianceUnit}</span>
            </div>
            <p className="text-body-sm font-body-sm text-on-surface-variant">
              Peak flux threshold maintained for optimal PV output.
            </p>
          </div>
          <div className="mt-space-lg bg-[#E8F3EC] text-primary p-space-sm rounded-lg text-label-sm font-label-sm flex items-center justify-between">
            <span>Efficiency Index</span>
            <span className="font-bold">{current.efficiencyIndex}</span>
          </div>
        </div>

        {/* Atmosphere Stats Card */}
        <div className="bg-surface-container-low rounded-xl p-space-lg flex flex-col justify-between shadow-sm border border-surface-container-high/60">
          <div className="space-y-space-md">
            <div className="flex justify-between items-center">
              <span className="text-label-sm font-label-sm tracking-wider uppercase text-on-surface-variant">
                Atmosphere
              </span>
              <span className="material-symbols-outlined text-secondary">compress</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-body-sm font-body-sm text-on-surface-variant">Barometric Pressure</span>
              <span className="text-headline-sm font-headline-sm text-on-surface">{current.pressure}</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-body-sm font-body-sm text-on-surface-variant">Cloud Cover</span>
              <span className="text-headline-sm font-headline-sm text-on-surface">{current.cloudCover}</span>
            </div>
          </div>
          <div className="mt-space-lg bg-surface-container-high h-2 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-[12%] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Historical Trends & Correlation Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
        {/* Main Chart Widget (7 days Irradiance vs Temperature) */}
        <div className="lg:col-span-2 bg-surface-container-low rounded-xl p-space-lg shadow-sm border border-surface-container-high/60 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-space-lg gap-space-md">
            <div>
              <h3 className="text-headline-md font-headline-md text-on-surface">Historical Weather Trends</h3>
              <p className="text-body-sm font-body-sm text-on-surface-variant">
                Solar Irradiance (W/m²) vs Ambient Temperature (°C) — Past 7 Days
              </p>
            </div>
            <div className="flex gap-space-xs bg-surface-container p-space-xs rounded-xl">
              {['7D', '30D', '1Y'].map((range) => (
                <button
                  key={range}
                  onClick={() => setActiveRange(range)}
                  className={`px-space-md py-space-xs rounded-lg text-label-md font-label-md transition-all ${
                    activeRange === range
                      ? 'bg-surface text-on-surface shadow-sm font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Trend Mockup */}
          <div className="w-full h-64 flex flex-col justify-between relative my-space-md">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="border-b border-outline w-full"></div>
              <div className="border-b border-outline w-full"></div>
              <div className="border-b border-outline w-full"></div>
              <div className="border-b border-outline w-full"></div>
            </div>

            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 180" preserveAspectRatio="none">
              <path
                d="M 20,130 C 80,110 150,60 220,70 C 290,80 360,40 480,50"
                fill="none"
                stroke="#176B45"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M 20,150 C 80,140 150,110 220,120 C 290,130 360,95 480,105"
                fill="none"
                stroke="#5B4300"
                strokeWidth="2"
                strokeDasharray="4 4"
                strokeLinecap="round"
              />
              <circle cx="480" cy="50" r="4" fill="#176B45" />
            </svg>

            <div className="flex justify-between text-label-sm font-label-sm text-on-surface-variant pt-space-xs border-t border-surface-container-high">
              {trend7Days.map((d) => (
                <span key={d.day}>{d.day}</span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-space-lg text-label-sm font-label-sm text-on-surface-variant border-t border-surface-container-high pt-space-md">
            <div className="flex items-center gap-space-xs">
              <span className="w-3 h-3 rounded-full bg-primary"></span>
              <span>Irradiance (W/m²)</span>
            </div>
            <div className="flex items-center gap-space-xs">
              <span className="w-3 h-0.5 bg-tertiary"></span>
              <span>Temperature (°C)</span>
            </div>
          </div>
        </div>

        {/* PV Temperature Derating Card */}
        <div className="bg-surface-container-low rounded-xl p-space-lg shadow-sm border border-surface-container-high/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-space-md">
              <h3 className="text-headline-sm font-headline-sm text-on-surface">Thermal Derating Index</h3>
              <span className="material-symbols-outlined text-primary">device_thermostat</span>
            </div>
            <p className="text-body-sm font-body-sm text-on-surface-variant mb-space-lg">
              Estimated temperature coefficient loss based on current module cell temperatures.
            </p>

            <div className="space-y-space-md">
              <div className="bg-surface-container p-space-md rounded-xl flex items-center justify-between">
                <span className="text-body-md text-on-surface-variant">Estimated Cell Temp</span>
                <span className="text-headline-sm font-headline-sm text-on-surface">43.8°C</span>
              </div>
              <div className="bg-surface-container p-space-md rounded-xl flex items-center justify-between">
                <span className="text-body-md text-on-surface-variant">Power Loss Coefficient</span>
                <span className="text-headline-sm font-headline-sm text-primary">-0.38%/°C</span>
              </div>
              <div className="bg-surface-container p-space-md rounded-xl flex items-center justify-between">
                <span className="text-body-md text-on-surface-variant">Net Derate Impact</span>
                <span className="text-headline-sm font-headline-sm text-tertiary font-bold">-7.14%</span>
              </div>
            </div>
          </div>

          <div className="pt-space-md border-t border-surface-container-high text-body-sm text-on-surface-variant">
            Next module cooling threshold triggers at 52.0°C.
          </div>
        </div>
      </div>
    </div>
  );
}
